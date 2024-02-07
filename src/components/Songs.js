import './Songs.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TrackItem from './TrackItem.js';
import { useEffect, useState } from 'react';
import GenerateRecommendations from './Forms/GenerateRecommendations.js';

const Songs = ({ spotify, onAddTrackClick }) => {
    const [recommendedTracks, setRecommendedTracks] = useState([]);
    const [isUsingGenerator, setIsUsingGenerator] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getRecommendationsBasedOnTopArtists = async () => {
            const response = await spotify.getMyTopArtists({ limit: 5 });

            const topArtists = response.items.map(item => item.id);

            const options = {
                limit: 100,
                seed_artists: topArtists.toString(),
            };
            const recommendations = await spotify.getRecommendations(options);

            setRecommendedTracks(recommendations.tracks);
        };

        getRecommendationsBasedOnTopArtists();
    }, [spotify]);

    useEffect(() => {
        const fetchData = async () => {
            if(searchValue.trim() === '') {
                return;
            }

            try {
                const response = await spotify.searchTracks(searchValue);
                const tracks = response.tracks.items;
                setRecommendedTracks(tracks);
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchData();
        }, 300);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [spotify, searchValue]);

    const generateSongRecommendationsFromSeedValues = async (genreSeeds, artistSeeds, trackSeeds) => {
        const genres = genreSeeds.map((genre) => genre.value);
        const artists = artistSeeds.map((artist) => artist.value);
        const tracks = trackSeeds.map((track) => track.value);

        const options = {
            limit: 100,
            seed_genres: genres.toString(),
            seed_artists: artists.toString(),
            seed_tracks: tracks.toString(),
        }
        const recommendations = await spotify.getRecommendations(options);

        setRecommendedTracks(recommendations.tracks);
        setIsUsingGenerator(false);
    };
 
    return (
        <Container id='songs-box' className='songs-box' >
            {!isUsingGenerator ?
            <>
                <Row>
                    <Col>
                        <Button onClick={() => setIsUsingGenerator(true)}>Generate</Button>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Search tracks"
                            className="search-bar"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                        <>
                        {
                            recommendedTracks.map(track => {
                                return (
                                    <Col xs={6} sm={4} md={4} lg={3} className='songs-column' key={track.id}>
                                        <TrackItem data={track} onAddTrackClick={onAddTrackClick} />
                                    </Col>)
                            })
                        }
                        </>
                </Row>
            </>
                :
            <>
                <Button onClick={() => setIsUsingGenerator(false)}>Back</Button>
                <GenerateRecommendations spotify={spotify} handleGenerateClick={generateSongRecommendationsFromSeedValues} />
            </>
            }
        </Container>
    );
};

export default Songs;
