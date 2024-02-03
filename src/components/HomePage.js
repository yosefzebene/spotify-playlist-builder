import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Profile from './Profile.js'
import Playlists from './Playlists.js';
import Songs from './Songs.js';
import SpotifyWebApi from 'spotify-web-api-js';
import { useState } from 'react';

const spotify = new SpotifyWebApi();

const HomePage = ({ spotifyToken }) => {
    spotify.setAccessToken(spotifyToken);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    return (
        <Container fluid={true}>
            <Row>
                <Col style={{padding: 0 }}><Profile spotify={spotify} /></Col>
            </Row>
            <Row>
                <Col sm={12} md={4} lg={4} style={{backgroundColor: '#212227'}}><Playlists spotify={spotify} selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} /></Col>
                <Col sm={12} md={8} lg={8} style={{backgroundColor: '#E9D6EC', paddingRight: '0'}}><Songs spotify={spotify} selectedPlaylist={selectedPlaylist}/></Col>
            </Row>
        </Container>
    );
};

export default HomePage;
