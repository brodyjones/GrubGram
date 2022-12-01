import Navbar from "../components/Navbar";
import PantryList from "../components/PantryList";
import PantryManager from "../components/PantryManager";
import "./Pantry.css";

function Pantry() {
    return (
        <div>
            <Navbar />
            <div className="left">
                <PantryManager />
            </div>
            <div  className="right">
                <PantryList />
            </div>
        </div>
    );
}

export default Pantry;