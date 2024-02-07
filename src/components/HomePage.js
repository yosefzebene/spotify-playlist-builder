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

    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    spotify.setAccessToken(spotifyToken);

    const getPlaylistTracks = async (id) => {
        const allTracks = [];

        var tracks = await spotify.getPlaylistTracks(id);
        allTracks.push(...tracks.items);

        while (tracks.next) {
            tracks = await spotify.getGeneric(tracks.next);
            allTracks.push(...tracks.items);
        }

        setPlaylistTracks(allTracks);
    };

    const onAddTrackClick = async (trackUri, trackId) => {
        // Check if track is already in playlist
        if (playlistTracks.find(item => item.track.id === trackId)) {
            alert("Track is already in the playlist");
            return;
        }

        if (!selectedPlaylist) {
            alert("Select a playlist!");
        }
        else {
            try {
                await spotify.addTracksToPlaylist(selectedPlaylist, [trackUri]);
                getPlaylistTracks(selectedPlaylist);
            } catch (e) {
                alert(e.response);
            }
        }
    };

    const onRemoveTrackClick = async (trackUri) => {
        try {
            await spotify.removeTracksFromPlaylist(selectedPlaylist, [trackUri]);
            getPlaylistTracks(selectedPlaylist);
        } catch (e) {
            alert(e.response);
        }
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
                        tracks={playlistTracks}
                        getPlaylistTracks={getPlaylistTracks}
                        onRemoveTrackClick={onRemoveTrackClick}
                        setSelectedPlaylist={setSelectedPlaylist} />
                </Col>
                <Col sm={12} md={8} lg={8} style={{backgroundColor: '#E9D6EC', padding: '0'}}>
                    <Songs
                        spotify={spotify}
                        onAddTrackClick={onAddTrackClick} />
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
