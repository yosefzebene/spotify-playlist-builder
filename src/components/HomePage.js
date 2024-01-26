import Profile from './Profile.js'
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const HomePage = ({ spotifyToken }) => {
    spotify.setAccessToken(spotifyToken);

    return (
        <div>
            <Profile spotify={spotify}/>
        </div>
    );
};

export default HomePage;