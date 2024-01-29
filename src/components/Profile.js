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

    console.log(user);

    return (
        <Navbar data-bs-theme="dark" style={{backgroundColor: '#764abc'}}>
            <Container>
                <Navbar.Brand>Playlist Builder</Navbar.Brand>
                <Navbar.Text className="justify-content-end">
                    <Image
                        alt="Profile"
                        src={user.images? user.images[0].url : avatar}
                        width="30"
                        height="30"
                        style={{marginRight: '5px'}}
                        roundedCircle
                    />
                    {user.display_name}
                </Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Profile;