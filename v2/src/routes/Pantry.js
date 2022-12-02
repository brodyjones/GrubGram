import { collection, getDocs, limit, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PantryList from "../components/PantryList";
import PantryManager from "../components/PantryManager";
import Recipe from "../components/Recipe";
import { auth, db } from "../firebase";
import "./Pantry.css";

function Pantry() {
    const [recipes, setRecipes] = useState([]);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
        const getRecipes = async () => {
            const recipesRef = collection(db, "recipe");
            const q = query(recipesRef, limit(5));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setRecipes(data);
        }
        getRecipes();
    }, [loading, user, navigate]);

    return (
        <div>
            <Navbar />
            <div className="left">
                <PantryManager />
                <PantryList />
            </div>
            <div className="right">
                {recipes.map((recipe) => {
                    return (
                        <Recipe recipe={recipe} />
                    );
                })}
            </div>
        </div>
    );
}

export default Pantry;