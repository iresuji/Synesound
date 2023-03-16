// import React, { useEffect } from 'react'
// import useSonginfo from '@/hooks/useSonginfo';

import { SwitchHorizontalIcon, HeartIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import { RewindIcon, FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, VolumeUpIcon, } from "@heroicons/react/solid";

function AudioPlayer() {
    //     const spotifyApi = useSpotify();
    //     const { data: session, status } = useSession();
    //     const [currentIdTrack, setCurrentIdTrack] =
    //         useRecoilState(currentTrackIdState);

    //     const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    //     const [volume, setVolume] = useState(50);

    //     const songInfo = useSongInfo();

    //     const fetchCurrentSong = () => {
    //         if (!songInfo) {
    //             spotifyApi.getMyCurrentPlayingTrack().then((data) => {
    //                 setCurrentIdTrack(data.body?.item.id);

    //                 spotifyApi.getMyCurrentPlaybackState().then((data) => {
    //                     setIsPlaying(data.body?.is_playing);
    //                 });

    //             });
    //         }
    //     };

    //     useEffect(() => {
    //         if (spotifyApi.getAccessToken() && !currentIdTrack) {
    //             fetchCurrentSong();
    //             setVolume(50);
    //         }

    //     }, [currentIdTrack, spotifyApi, session]);


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
            <div>
                <h1>This is your player</h1>
                <SwitchHorizontalIcon className="button" />
                <RewindIcon className="button" />
            </div>
        </div>
    )
}

export default AudioPlayer;
