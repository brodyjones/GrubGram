import * as React from 'react';
import { Typography, Autocomplete, Card, CardContent, CardHeader, CardActions, TextField, Button } from '@mui/material';
import './Recipe.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: red[600],
    },
    secondary: {
      main: yellow[500],
    },
  },
});

function Recipe() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="rightcol">
          <Card
            sx={{ maxWidth: 330, ml: 35 }}
          >
            <CardHeader
              style={{ color: "red" }}
              title="Search All Recipes"
            />
            <CardContent>
              <Autocomplete
                disablePortal
                id="ingredient-dropdown"
                options={recipeNames}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Recipe..." />}
                //onChange={(event, value) => setRecipe(value)}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
              //onClick={() => { gotoURL() }}
              >
                Go To Website
              </Button>
            </CardActions>
          </Card>
        </div>
        <div className="leftcol">
          <Card sx={{ width: 850, ml: 1 }}>
            <CardContent>
              <Typography variant="h5">
                ROCKY ROAD CAKE
              </Typography>
              <Typography variant="subtitle" color="text.secondary">
                Ingredients:
              </Typography>
              <Typography variant="body2">
                1 c. chopped walnuts <br />
                1 c. seedless raisins <br />
                1 c. miniature marshmallows <br />
                1 (6 oz.) pkg. semi-sweet chocolate pieces <br />
                1 (18 1/2 oz.) pkg. devil's food cake mix with pudding in the mix <br />
                4 eggs <br />
                1 c. Hellmann's mayonnaise <br />
                1 c. water <br />
              </Typography>
              <Typography variant="subtitle" color="text.secondary">
                Preparation:
              </Typography>
              <Typography variant="body2">
                Grease and flour 12-cup fluted tube pan or Bundt pan. In small bowl, mix walnuts, raisins, marshmallows and chocolate pieces. In large bowl with mixer at low speed, beat together cake mix, eggs, mayonnaise and water just until blended. Increase speed to medium; beat for 2 minutes. Stir in nut mixture. Pour in prepared pan. Bake in a 350° oven for 50 minutes or until cake tester inserted in center comes out clean. Cool in pan for 15 minutes. Remove. Cool on rack. If desired, dust with confectioners sugar. Makes 12 servings.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                varaint="contained"
              >
                Go To Website
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Recipe;

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