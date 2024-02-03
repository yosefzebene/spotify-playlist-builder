import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const CreatePlaylist = ({spotify, setIsCreatingPlaylist}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [publicPlaylist, setPublicPlaylist] = useState(true);
    const [collaborative, setCollaborative] = useState(false);

    const onCreateClick = async () => {
        const user = await spotify.getMe();
        const options = {
            name: name,
            public: publicPlaylist,
            collaborative: collaborative,
            description: description,
        };

        await spotify.createPlaylist(user.id, options);
        setIsCreatingPlaylist(false);
    };

    return (
        <Form className='playlist-create-form'>
            <Form.Group className="mb-3">
                <Form.Control 
                    className="mb-3"
                    type="text"
                    placeholder='Name'
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
                <Form.Control 
                    className="mb-3"
                    as="textarea"
                    rows={3}
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox" 
                    label="Public"
                    checked={publicPlaylist}
                    onChange={(e) => setPublicPlaylist(e.target.checked)}
                />
                {
                    !publicPlaylist &&
                    <Form.Check 
                        type="checkbox" 
                        label="Collaborative"
                        checked={collaborative}
                        onChange={(e) => setCollaborative(e.target.checked)}
                    />
                }
            </Form.Group>
            <Button onClick={onCreateClick}>
                Create
            </Button>
        </Form>
    );
};

export default CreatePlaylist;
