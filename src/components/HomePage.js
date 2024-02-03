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
    const [tracks, setTracks] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    spotify.setAccessToken(spotifyToken);

    const getPlaylistTracks = async (id) => {
        const allTracks = [];

        var playlistTracks = await spotify.getPlaylistTracks(id);
        allTracks.push(...playlistTracks.items);

        while (playlistTracks.next) {
            playlistTracks = await spotify.getGeneric(playlistTracks.next);
            allTracks.push(...playlistTracks.items);
        }

        setTracks(allTracks);
    };

    const onAddTrackClick = async (trackUri) => {
        if (!selectedPlaylist) {
            alert("Select a playlist!");
        }
        else {
            await spotify.addTracksToPlaylist(selectedPlaylist, [trackUri]);
            getPlaylistTracks(selectedPlaylist);
        }
    };

    const onRemoveTrackClick = async (trackUri) => {
        await spotify.removeTracksFromPlaylist(selectedPlaylist, [trackUri]);
        getPlaylistTracks(selectedPlaylist);
    };

    return (
        <Container fluid={true}>
            <Row>
                <Col style={{padding: 0 }}><Profile spotify={spotify} /></Col>
            </Row>
            <Row>
                <Col sm={12} md={4} lg={4} style={{backgroundColor: '#212227'}}>
                    <Playlists
                        spotify={spotify}
                        tracks={tracks}
                        getPlaylistTracks={getPlaylistTracks}
                        onRemoveTrackClick={onRemoveTrackClick}
                        setSelectedPlaylist={setSelectedPlaylist} />
                </Col>
                <Col sm={12} md={8} lg={8} style={{backgroundColor: '#E9D6EC', paddingRight: '0'}}>
                    <Songs
                        spotify={spotify}
                        onAddTrackClick={onAddTrackClick} />
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
