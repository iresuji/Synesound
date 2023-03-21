import spotifyApi from '@/lib/spotify';
import React from 'react'

function useSpotifySearch() {
    return (
        spotifyApi.searchTracks('Love')
            .then(function (data) {
                console.log('Search by "Love"', data.body);
            }, function (err) {
                console.error(err);
            })
    )
};

export default useSpotifySearch;