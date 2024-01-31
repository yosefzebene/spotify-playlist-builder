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
        <Container fluid={true}>
            <Row>
                <Col style={{padding: 0 }}><Profile spotify={spotify} /></Col>
            </Row>
            <Row style={{backgroundColor: '#000000'}}>
                <Col sm={12} md={true} lg={true}><Playlists spotify={spotify} /></Col>
                <Col sm={12} md={true} lg={true}><Songs spotify={spotify} /></Col>
            </Row>
        </Container>
    );
};

export default HomePage;
