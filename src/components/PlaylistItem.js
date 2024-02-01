import Card from 'react-bootstrap/Card';
import playlistCover from '../assets/playlistCover.jpg';

const PlaylistItem = ({ data, clickHandler }) => {
    return (
        <Card className='playlist-item' onClick={() => clickHandler(data.id)}>
            <Card.Img 
                variant='top'
                src={data.images.length ? data.images[0].url : playlistCover}
                style={{ height: '100px', width: '100px'}}
            />
            <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Subtitle><b>{data.owner.display_name}</b> . {data.tracks.total} songs</Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export default PlaylistItem;
