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
              style={{color: "red"}}
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
  "ROCKY ROAD CAKE",
  "CHOCOLATE PUDDING DESSERT",
  "CHOCOLATE DRINK MIX"
]