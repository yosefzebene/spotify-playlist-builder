import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import playlistCover from '../assets/playlistCover.jpg';
import CreatePlaylist from './Forms/CreatePlaylist';
import './Playlists.css';

const Playlists = ({ spotify }) => {
    const [playlists, setPlaylists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [displayingTracks, setDisplayingTracks] = useState(false);
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);

    useEffect(() => {
        const getUserPlaylists = async () => {
            const allPlaylists = [];

            var playlists = await spotify.getUserPlaylists();
            allPlaylists.push(...playlists.items);

            while (playlists.next) {
                playlists = await spotify.getGeneric(playlists.next);
                allPlaylists.push(...playlists.items);
            }

            setPlaylists(allPlaylists);
        };
        getUserPlaylists();
    }, [spotify, displayingTracks, isCreatingPlaylist]);

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

    const onPlaylistClick = (id) => {
        // Set a state on the parent component that shows which playlist id was selected.
        getPlaylistTracks(id);
        setDisplayingTracks(true);
    };

    return (
        // Height needs to be 50vh for mobile
        <div className='playlists-box'>
            {!isCreatingPlaylist ?
            <>
                {
                    displayingTracks ? 
                    <Button onClick={() => setDisplayingTracks(false)}>Back</Button>
                    :
                    <Button onClick={() => setIsCreatingPlaylist(true)}>Create Playlist</Button>
                }
                <Stack gap={2}>
                    {
                        displayingTracks ?
                        tracks.map(item => {
                            return <TrackItem key={item.track.id} data={item}/>
                        })
                        :
                        playlists.map(playlist => {
                            return <PlaylistItem key={playlist.id} data={playlist} clickHandler={onPlaylistClick}/>
                        })
                    }
                </Stack>
            </>
            :
            <>
                <Button onClick={() => setIsCreatingPlaylist(false)}>Cancel</Button>
                <CreatePlaylist setIsCreatingPlaylist={setIsCreatingPlaylist} spotify={spotify} />
            </>
            }
        </div>
    );
};

const PlaylistItem = (props) => {
    return (
        <Card className='playlist-item' onClick={() => props.clickHandler(props.data.id)}>
            <Card.Img 
                variant='top'
                src={props.data.images.length ? props.data.images[0].url : playlistCover}
                style={{ height: '100px', width: '100px'}}
            />
            <Card.Body>
                <Card.Title>{props.data.name}</Card.Title>
                <Card.Subtitle><b>{props.data.owner.display_name}</b> . {props.data.tracks.total} songs</Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

const TrackItem = (props) => {
    return (
        <Card className='track-item'>
             <Card.Img 
                variant='top' 
                src={props.data.track.album.images[0].url}
                style={{ height: '100px', width: '100px'}}
             />
            <Card.Body>
                <Card.Title>{props.data.track.name}</Card.Title>
                <Card.Subtitle>{props.data.track.artists.map((artist => artist.name + " "))}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export default Playlists;
