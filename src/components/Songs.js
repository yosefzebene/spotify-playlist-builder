import './Songs.css';
import Button from 'react-bootstrap/Button';
import TrackItem from './TrackItem.js';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Songs = ({ spotify, onAddTrackClick }) => {
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
        <Container className='songs-box' >
            <Button>Recommended</Button>
            <Row>
                {
                    recommendedTracks.map(track => {
                        return (
                            <Col xs={6} sm={4} md={4} lg={3} className='songs-column' key={track.id}>
                                <TrackItem data={track} onAddTrackClick={onAddTrackClick} />
                            </Col>)
                    })
                }
            </Row>
        </Container>
    );
};

export default Songs;
