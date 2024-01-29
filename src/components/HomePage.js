import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Profile from './Profile.js'
import Playlists from './Playlists.js';
import Songs from './Songs.js';
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const HomePage = ({ spotifyToken }) => {
    spotify.setAccessToken(spotifyToken);

    return (
        <Container fluid={true} style={{height: '100vh'}}>
            <Row>
                <Col style={{padding: 0}}><Profile spotify={spotify} /></Col>
            </Row>
            <Row style={{backgroundColor: 'black'}}>
                <Col><Playlists spotify={spotify} /></Col>
                <Col><Songs spotify={spotify} /></Col>
            </Row>
        </Container>
    );
};

export default HomePage;