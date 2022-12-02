import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PantryList from "../components/PantryList";
import PantryManager from "../components/PantryManager";
import { auth } from "../firebase";
import "./Pantry.css";

function Pantry() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [loading, user, navigate]);

    return (
        <div>
            <Navbar />
            <div className="left">
                <PantryManager />
            </div>
            <div className="right">
                <PantryList />
            </div>
        </div>
    );
}

export default Pantry;