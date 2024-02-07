import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { useEffect, useState } from 'react';
import avatar from '../assets/avatar.png';

const Profile = ({ spotify }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const user = await spotify.getMe();
            setUser(user);
        }
    
        getUser();
    }, [spotify])

    return (
        <Navbar data-bs-theme="dark" style={{backgroundColor: '#EAF4D3', height: '56px'}}>
            <Container>
                <Navbar.Brand style={{ color: '#212227' }}>Playlist Builder</Navbar.Brand>
                <Navbar.Text className="justify-content-end" style={{ color: '#212227', padding: '0'}}>
                    <Image
                        alt="Profile"
                        src={user.images?.length ? user.images[0].url : avatar}
                        width="35"
                        height="35"
                        style={{marginRight: '10px', objectFit: 'cover', border: '2px solid #212227'}}
                        roundedCircle
                    />
                    <b>{user.display_name}</b>
                </Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Profile;
