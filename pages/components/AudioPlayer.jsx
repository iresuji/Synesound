import React, { useEffect } from 'react'
// import useSonginfo from '@/hooks/useSonginfo';
// import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';

import { SwitchHorizontalIcon, HeartIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import { RewindIcon, FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, VolumeUpIcon, } from "@heroicons/react/solid";
import spotifyApi from '@/lib/spotify';

function AudioPlayer() {
    // const spotifyApi = useSpotify();
    // const { data: session, status } = useSession();
    // const [currentIdTrack, setCurrentIdTrack] =
    //     useRecoilState(currentTrackIdState);

    // const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    // const [volume, setVolume] = useState(50);

    // const songInfo = useSongInfo();

    // const fetchCurrentSong = () => {
    //     if (!songInfo) {
    //         spotifyApi.getMyCurrentPlayingTrack().then((data) => {
    //             setCurrentIdTrack(data.body?.item.id);

    //             spotifyApi.getMyCurrentPlaybackState().then((data) => {
    //                 setIsPlaying(data.body?.is_playing);
    //             });

    //         });
    //     }
    // };

    // useEffect(() => {
    //     if (spotifyApi.getAccessToken() && !currentIdTrack) {
    //         fetchCurrentSong();
    //         setVolume(50);
    //     }

    // }, [currentIdTrack, spotifyApi, session]);


    return (
        <div>
            {/* Left */}
            <div>
                {/* <img src={songInfo?.album.images?.[0]?.url} alt="" />
                <div>
                    <h3>{songInfo?.name} </h3>
                    <p>{songInfo?.artists?.[0]?.name} </p>
                </div> */}
            </div>
            {/* Center */}
            <div className='flex items-center justify-evenly'>
                <SwitchHorizontalIcon className="button" />
                <RewindIcon className="button" />
                <PlayIcon className='button w-10 h-10' />//

                <FastForwardIcon className="button" onClick={() => spotifyApi.skipToPrevious()} />

                <ReplyIcon className="button" />

            </div>
            <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
                <VolumeDownIcon className='button' />
                <input className='w-14 md:w-28' type="range" value="" min={0} max={100} />
                <VolumeUpIcon className='button' />
            </div>
        </div>
    )
}

export default AudioPlayer;
