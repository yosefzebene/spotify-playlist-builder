import './Songs.css';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import TrackItem from './TrackItem.js';
import { useEffect, useState } from 'react';

const Songs = ({ spotify }) => {
    const [recommendedTracks, setRecommendedTracks] = useState([]);

    useEffect(() => {
        const getRecommendationsBasedOnTopArtists = async () => {
            const response = await spotify.getMyTopArtists({ limit: 5 });

            const topArtists = response.items.map(item => item.id);

            const options = { seed_artists: topArtists.toString() };
            const recommendations = await spotify.getRecommendations(options);

            setRecommendedTracks(recommendations.tracks);
        };

        getRecommendationsBasedOnTopArtists();
    }, [spotify]);
 
    return (
        <div className='songs-box'>
            <Button>Recommended</Button>
            <Stack gap={2}>
                {
                    recommendedTracks.map(track => {
                        return <TrackItem key={track.id} data={track}/>
                    })
                }
            </Stack>
        </div>
    );
};

export default Songs;
