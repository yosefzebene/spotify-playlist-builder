import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const TrackItem = ({ data }) => {
    return (
        <Card className='track-item'>
             <Card.Img 
                variant='top' 
                src={data.track ? data.track.album.images[0].url : data.album.images[0].url}
                style={{ height: '100px', width: '100px'}}
             />
            <Card.Body>
                <Card.Title>{data.track ? data.track.name : data.name}</Card.Title>
                <Card.Subtitle>
                {data.track ? 
                    data.track.artists.map(artist => artist.name + " ") :
                    data.artists.map(artist => artist.name + " ")}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export default TrackItem;
