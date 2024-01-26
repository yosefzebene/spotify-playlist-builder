import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Profile = ({ spotify }) => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const user = await spotify.getMe();
            setUserName(user.display_name);
        }
    
        getUser();
    }, [spotify])

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Playlist Builder</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: {userName}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Profile;