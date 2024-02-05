import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './TrackItem.css';

const TrackItem = ({ data, onAddTrackClick, onRemoveTrackClick }) => {
    return (
        <Card className='track-item'>
             <Card.Img 
                variant='top' 
                src={data.track ? data.track.album.images[0].url : data.album.images[0].url}
             />
            <Card.Body>
                <Card.Title 
                    onClick={() => window.open(data.track ? data.track.external_urls.spotify :  data.external_urls.spotify, '_blank')}
                >
                    {data.track ? data.track.name : data.name}
                </Card.Title>
                <Card.Subtitle>
                {data.track ? 
                    data.track.artists.map(artist => artist.name + " ") :
                    data.artists.map(artist => artist.name + " ")}
                </Card.Subtitle>
                { data.preview_url &&
                    <audio className='preview-player' controls controlsList="nodownload" src={data.preview_url}></audio>
                }
            </Card.Body>
            {data.track ?
                <Button className='remove-button' onClick={() => onRemoveTrackClick(data.track.uri)}>Remove</Button>
                :
                <Button className='add-button' onClick={() => onAddTrackClick(data.uri)}>Add</Button>
            }
        </Card>
    );
};

export default TrackItem;
