import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import CreatePlaylist from './Forms/CreatePlaylist';
import TrackItem from './TrackItem.js';
import PlaylistItem from './PlaylistItem.js';
import './Playlists.css';

const Playlists = ({ spotify, tracks, getPlaylistTracks, onRemoveTrackClick, setSelectedPlaylist }) => {
    const [playlists, setPlaylists] = useState([]);
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

    const onPlaylistClick = (id) => {
        setDisplayingTracks(true);
        getPlaylistTracks(id);
        setSelectedPlaylist(id);
    };

    return (
        <div className='playlists-box'>
            {!isCreatingPlaylist ?
            <>
                {
                    displayingTracks ? 
                    <Button 
                        onClick={() => { 
                            setDisplayingTracks(false); 
                            setSelectedPlaylist('');
                    }}>
                        Back
                    </Button>
                    :
                    <Button onClick={() => setIsCreatingPlaylist(true)}>Create Playlist</Button>
                }
                <Stack gap={2}>
                    {
                        displayingTracks ?
                        tracks.map(item => {
                            return <TrackItem key={item.track.id} data={item} onRemoveTrackClick={onRemoveTrackClick}/>
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

export default Playlists;
