import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Autocomplete, Button, Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material";

export default function CreatePost() {
    const [caption, setCaption] = useState("");
    const [recipe, setRecipe] = useState("");
    const [user] = useAuthState(auth);
    const [image, setImage] = useState(null);


    const initializeUserPost = async () => {
        if (!image || !caption || !recipe) return;
        const imageRef = ref(storage, `images/${image.name}`);
        uploadBytes(imageRef, image);
        getDownloadURL(ref(storage, `images/${image.name}`))
            .then((url) => {
                createUserPost(url);
            })
    }
 

    const createUserPost = async (imageLink) => {
        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);
        const today = new Date();
        const dateCreated = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() + ' ' +
            today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        const name = docSnap.data().name;
        await setDoc(doc(db, "posts", dateCreated), { name: name, image: imageLink, caption: caption, recipe: recipe });
        await updateDoc(docRef, { posts: arrayUnion(dateCreated) });
        window.location.reload(false);
    }

    return (
        <Card sx={{ width: 300, mt: 3 }}>
            <CardHeader title="Create a Post"></CardHeader>
            <CardContent>
                <TextField type='file'
                    sx={{ mt: 1, mb: 1, width: 267 }}
                    id="filled-basic"
                    onChange={(event) => {
                        setImage(event.target.files[0]);
                    }}
                />
                <br></br>
                <TextField
                    sx={{ mt: 1, mb: 1, width: 267 }}
                    id="filled-basic"
                    label='Caption...'
                    onChange={(event) => {
                        setCaption(event.target.value);
                    }}
                />
                <br></br>
                <Autocomplete
                    disablePortal
                    id="ingredient-dropdown"
                    options={recipeNames}
                    sx={{ mt: 1, mb: 1, width: 267 }}
                    renderInput={(params) => <TextField {...params} label="Recipe..." />}
                    onChange={(event, value) => {
                        setRecipe(value);
                    }}
                />

                <br></br>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={initializeUserPost}>Post</Button>
            </CardActions>
        </Card>
    );
}

const recipeNames = [
    "7 LAYER DIP",
    "ABC SWEET POTATO SOUFFLE",
    "AMBROSIA",
    "ANGEL HAIR PASTA WITH CRAB",
    "ANTIPASTO SQUARES",
    "APPETIZER SHRIMP DIP",
    "APPLE CAKE",
    "APPLE PORK TENDERLOIN",
    "APPLE SALAD",
    "ASPARAGUS",
    "AWARD WINNING GERMAN CHOCOLATE CAKE",
    "BACON APPETIZERS",
    "BAGEL BITES",
    "BAKED BEANS",
    "BAKED CHICKEN SUPREME",
    "BAKED EGGPLANT CASSEROLE",
    "BAKED SQUASH AND APPLES",
    "BAKED WHOLE CAULIFLOWER",
    "BANANA BREAD",
    "BANANA CREAM PIE",
    "BANANA PUDDING",
    "BANANA-BERRY DRINK",
    "BASIC GRILLED SALMON STEAKS",
    "BAYOU RED BEANS AND RICE",
    "BEEF CHIMICHANGA",
    "BEEF FAJITAS",
    "BEST STRAWBERRY SHORTCAKE",
    "BISCUIT PIZZA SNACKS",
    "BLACK PEPPER STEAK",
    "BLEU CHEESE DIP",
    "BLUEBERRY CRUNCH",
    "BLUEBERRY MUFFINS",
    "BRAN MUFFINS",
    "BREAD PUDDING",
    "BREAKFAST PIZZA",
    "BROCCOLI CASSEROLE",
    "BROCCOLI CHEESE DIP",
    "BUTTERMILK BISCUITS",
    "BUTTERMILK PIE",
    "CAESAR SALAD",
    "CANDIED PECANS",
    "CARROT CAKE",
    "CHEESE FONDUE",
    "CHEESE/BACON DIP",
    "CHICAGO STYLE PIZZA",
    "CHICKEN & DUMPLINGS",
    "CHICKEN AND VEGETABLE NOODLE SOUP",
    "CHICKEN BURRITOS",
    "CHICKEN CORN CHOWDER",
    "CHICKEN ENCHILADAS",
    "CHICKEN SPAGHETTI",
    "CHICKEN STROGANOFF",
    "CHICKEN TETRAZZINI",
    "CHICKEN WINGS ON THE GRILL",
    "CHICKEN WINGS",
    "CHOCOLATE BOTTOM CUPCAKES",
    "CHOCOLATE CAKE FROM SCRATCH",
    "CHOCOLATE CAKE",
    "CHOCOLATE COVERED PEANUTS",
    "CHOCOLATE DIPPED STRAWBERRIES",
    "CHOCOLATE DRINK MIX",
    "CHOCOLATE PUDDING DESSERT",
    "CHUNKY POTATO SOUP",
    "COFFEE CAKE",
    "CRAB DIP",
    "CRANBERRY JELLO SALAD",
    "CREAM CHEESE SUGAR COOKIES",
    "DEEP-DISH PIZZA CASSEROLE",
    "DO AHEAD MASHED POTATOES",
    "EASY HERBED GRILLED SALMON",
    "EGGPLANT FRITTERS",
    "EGGPLANT PARMESAN",
    "EGGS IN A BASKET",
    "FAT FREE FRUIT SALAD",
    "FISH AND CHIPS",
    "FRENCH ONION SOUP",
    "FRENCH TOAST",
    "FRESH FRUIT DIP",
    "FROZEN POPS",
    "FRUIT CAKE",
    "FRUIT DIP",
    "GARDEN PASTA",
    "GLAZED CHICKEN WINGS",
    "GLAZED SALMON",
    "GLAZED STRAWBERRY TART",
    "GREEN BEAN SALAD",
    "GRILLED CHEESE BREAD",
    "GRILLED CORN",
    "GRILLED CORNBREAD",
    "GRILLED EGGPLANT",
    "GRILLED FISH AND SHRIMP",
    "GRILLED GARLIC SHRIMP",
    "GRILLED SANDWICHES",
    "GRILLED STEAK WITH MUSTARD MARINADE",
    "GRILLED VEAL CHOPS",
    "GUACAMOLE DIP",
    "HASHBROWN CASSEROLE",
    "HAWAIIAN BURGER",
    "HONEY BEAR HONEY DRINK",
    "HONEY ROASTED NUTS",
    "HOT BUTTERED PINEAPPLE DRINK",
    "HOT CRAB DIP",
    "ITALIAN-STYLE PORK SOUP",
    "JOHNS FAMOUS BROTHERHOOD HAM",
    "LASAGNA",
    "LAYERED TEX-MEX DIP",
    "LENTIL SOUP",
    "LOW CALORIE PARTY MIX",
    "MACARONI SALAD",
    "MEXICAN CHEESE SOUP",
    "MISSISSIPPI MUD CAKE",
    "MULTI GRAIN PIZZA",
    "NINES CHOCOLATE PUDDING",
    "NO BAKE CHOCOLATE PEANUT BUTTER COOKIES",
    "OLD FASHIONED LIGHT FRUIT CAKE",
    "ORANGE SALAD",
    "PANCAKES",
    "PANCHO",
    "PARTY FRUIT PUNCH",
    "PARTY SANDWICHES",
    "PASTA WITH CHEESE AND WALNUTS",
    "PAW PAW",
    "PEACH COBBLER",
    "PECAN SNACKS",
    "PEPPERCORN DIP",
    "PINEAPPLE FLUFF",
    "PIZZA CARBONARA",
    "PIZZA HOT DISH",
    "PIZZA IN A POCKET",
    "PIZZA SNACK",
    "PIZZA STEAK SUB",
    "PLAKI (GREEK FISH)",
    "PUMPKIN BREAD",
    "PUMPKIN PIE",
    "RASPBERRY BARS",
    "RAVE REVIEWS COCONUT CAKE",
    "RHUBARB BREAD",
    "ROCKY ROAD CAKE",
    "ROMAINE-VEGETABLE SALAD",
    "SALMON SPREAD",
    "SALSA DIP SAUCE",
    "SAUSAGE BALLS",
    "SAUSAGE LASAGNA",
    "SAUSAGE STEW",
    "SAVORY CHEESE SPREAD",
    "SAVORY PORK CHOPS",
    "SEAFOOD BOULETTES",
    "SEASON",
    "SHRIMP DIP",
    "SKILLET SWEET POTATOES",
    "SNACK PIZZA",
    "SPAGHETTI SAUCE",
    "SPAGHETTI",
    "SPINACH DIP",
    "SPINACH MEATBALLS",
    "SPINACH SOUP",
    "STANDING RIB ROAST",
    "STRAWBERRY DIVINITY",
    "STRAWBERRY FRUIT DIP",
    "STRAWBERRY JELLO SALAD",
    "STUFFED TUNA SHELLS",
    "SUGAR COATED PEANUTS",
    "SUGAR PLUMS",
    "TACO SALAD",
    "TOSSED ITALIAN SALAD",
    "TROPICAL SALAD",
    "UNCLE DONS CHICKEN NUGGETS",
    "VEGETABLE PIZZA",
    "WILD RICE CASSEROLE",
    "ZUCCHINI BREAD"
] 