import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './TrackItem.css';

const TrackItem = ({ data, addClickHandler, removeClickHandler }) => {
    return (
        <Card className='track-item'>
             <Card.Img 
                variant='top' 
                src={data.track ? data.track.album.images[0].url : data.album.images[0].url}
             />
            <Card.Body>
                <Card.Title>{data.track ? data.track.name : data.name}</Card.Title>
                <Card.Subtitle>
                {data.track ? 
                    data.track.artists.map(artist => artist.name + " ") :
                    data.artists.map(artist => artist.name + " ")}
                </Card.Subtitle>
            </Card.Body>
            {data.track ?
                <Button className='remove-button' onClick={() => removeClickHandler(data.track.uri)}>Remove</Button>
                :
                <Button className='add-button' onClick={() => addClickHandler(data.uri)}>Add</Button>
            }
        </Card>
    );
};

export default TrackItem;
