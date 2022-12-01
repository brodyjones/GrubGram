import Navbar from "../components/Navbar";
import PantryList from "../components/PantryList";
import PantryManager from "../components/PantryManager";
import "./Pantry.css";

function Pantry() {
    return (
        <div>
            <Navbar />
            <PantryManager />
            <PantryList />
        </div>
    );
}

export default Pantry;