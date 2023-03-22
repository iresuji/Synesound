import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSongInfo from '@/hooks/useSongInfo';
import useSpotify from '@/hooks/useSpotify'
import { SearchIcon, SwitchHorizontalIcon, VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { PlayIcon, PauseIcon, RewindIcon, FastForwardIcon, ReplyIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { debounce, shuffle } from 'lodash';

import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import ImgExtractor from '../api/regim';


function Player() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);

    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const [volume, setVolume] = useState(50);


    const skipToNextTrack = () => {
        spotifyApi.skipToNext()
            .then(function () {
                console.log('Skip to next');
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
            });
    }

    const skipToPrevious = () => {
        spotifyApi.skipToPrevious()
            .then(function () {
                console.log('Skip to previous');
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
            });
    }


    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log("Now playing: ", data.body?.item);
                setCurrentIdTrack(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                })
            });
        }
    };

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };


    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }

    }, [currentTrackIdState, spotifyApi, session]);

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }

    }, [volume]);

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => { });
        }, 500), []
    );


    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const mySearch = JSON.parse(localStorage.getItem('search') || '');
        setSearch(mySearch);
        if (mySearch !== "") {
            spotifyApi.searchTracks(mySearch).then(res => {
                console.log(res.body.tracks);
                if (res.body.tracks.items.length > 0) {
                    const song = (shuffle(res.body.tracks.items).pop());
                    console.log(song);
                    spotifyApi.play({ uris: [song.uri] }).then(res => setCurrentIdTrack(song.id));
                }
            });
        }
    }, []);

    useEffect(() => {
        if (!search) return setSearchResults([])
        spotifyApi.searchTracks(search).then(res => {

        })
    }, [search]);



    return (
        <div>


            <div className='h-24  text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
                {/* Left */}
                <div className='flex items-center space-x-4'>
                    <img className='md:inline h-10 w-10' src={songInfo?.album.images?.[0]?.url} alt="" />
                    <div>
                        <h3>{songInfo?.name} </h3>
                        <p>{songInfo?.artists?.[0]?.name} </p>
                    </div>
                </div>
                {/* Center */}
                <div className='flex items-center justify-evenly'>
                    {/* <SwitchHorizontalIcon className='button' /> */}
                    <RewindIcon onClick={skipToPrevious} className='button' />
                    {/* onClick={() => spotifyApi.skipToPrevious()}  not working*/}
                    {isPlaying ? (
                        <PauseIcon onClick={handlePlayPause} className='button w-10 h-10' />
                    ) : (
                        <PlayIcon onClick={handlePlayPause} className='button w-10 h-10' />
                    )}

                    <FastForwardIcon onClick={skipToNextTrack} className='button' />
                    {/* <ReplyIcon className='button' /> */}
                </div>

                {/* Right */}
                <div className='flex item-center space-x-3 md:space-x-4 justify-end pr-5'>
                    <VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className='button self-center' />
                    <input className='w-14 md:w-28' type="range" value={volume} onChange={(e) => setVolume(Number(e.target.value))} min={0} max={100} />
                    <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className='button self-center' />
                </div>
            </div>
            {/* <div class="flex items-center justify-center pt-2 relative mx-auto text-gray-600">
                <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-5 rounded-lg text-sm focus:outline-none"
                    type="search" value={search} onChange={e => setSearch(e.target.value)} name="search" placeholder="Search" />
                <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
                    <SearchIcon className='h-5 w-5' />
                </button>
            </div> */}

        </div>

    )
}

export default Player