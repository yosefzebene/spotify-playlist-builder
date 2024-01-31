import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import playlistCover from '../assets/playlistCover.jpg';
import './Songs.css';

const Songs = ({ spotify }) => {
    return (
        <div className='songs-box'>
            <Button>Recommended</Button>
            <Stack gap={2}>
                <Card>
                    <Card.Img 
                        variant='top' 
                        src={playlistCover}
                        style={{ height: '100px', width: '100px'}}
                    />
                    <Card.Body>
                        <Card.Title>Song Title</Card.Title>
                        <Card.Subtitle><b>Artist</b> . Length</Card.Subtitle>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img 
                        variant='top' 
                        src={playlistCover}
                        style={{ height: '100px', width: '100px'}}
                    />
                    <Card.Body>
                        <Card.Title>Song Title</Card.Title>
                        <Card.Subtitle><b>Artist</b> . Length</Card.Subtitle>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img 
                        variant='top' 
                        src={playlistCover}
                        style={{ height: '100px', width: '100px'}}
                    />
                    <Card.Body>
                        <Card.Title>Song Title</Card.Title>
                        <Card.Subtitle><b>Artist</b> . Length</Card.Subtitle>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img 
                        variant='top' 
                        src={playlistCover}
                        style={{ height: '100px', width: '100px'}}
                    />
                    <Card.Body>
                        <Card.Title>Song Title</Card.Title>
                        <Card.Subtitle><b>Artist</b> . Length</Card.Subtitle>
                    </Card.Body>
                </Card>
            </Stack>
        </div>
    );
};

export default Songs;
