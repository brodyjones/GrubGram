import Navbar from "../components/Navbar";
import "./Profile.css";
import ProfileFeed from '../components/ProfileFeed'

function Profile() {
    return (
        <div>
            <Navbar />
            <ProfileFeed />
        </div>
    );
}

export default Profile;