import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { redirectToSpotifyAuthorize } from '../spotify_auth/spotify';
import './Login.css';

const Login = () => {
    return (
        <Card className='login-card text-center'>
            <Card.Body>
                <Card.Title>
                    Use the credentials below to login
                </Card.Title>
                <Card.Text>
                    Email: <b>wotino1557@laymro.com</b> <br />
                    Password: <b>wmxX_~!aMF7+*Cy</b>
                </Card.Text>
                <Button onClick={redirectToSpotifyAuthorize}>Login with Spotify</Button>
            </Card.Body>
        </Card>
    );
};

export default Login;
