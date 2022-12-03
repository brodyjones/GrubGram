# GrubGram

How to run our project:

1. clone our entire repository on local machine: git clone [link]
2. enter the v2 folder
3. download npm
4. run these commands: 
npm install @mui/material-icons @mui/material @emotion/react @emotion/styled 
npm install firebase 
npm install react-firebase-hooks 
npm install react-router-dom
npm start

Project Features:

Login/Authentication/Register: User must sign in with email and password before navigating to the other pages of the webapp or create an account with name, email, and password. After signing in or logging up, the user is automatically navigated to the home page and the user is now logged in and authenticated.

NavBar: The top of every page but login/register has the same navbar where the user can navigate between pages: Home, Pantry, RecipeSearch. Also, the profile photo is displayed on the right as a dropdown which has buttons to the user profile page and to logout and return to the login/register page.

Posting: On the left of the home page, the user can create a post. They must choose a file, input a caption, and choose a recipe from the database list and then click the post button to do so. Their post will show up to the right at the top of the feed.

GrubFeed: On the right of the home page, all of the posts created by any user are displayed in order of date/time created with the most recent at the top. Each post has this format on a card: profile photot and username of who posted, timestamp, image, caption, recipe. There is also a like button that increments every time another user presses the button on a post. The recipe is a button that can be clicked to navigate to the recipe URL in a separate window.

Pantry: On the pantry page to the left, the user can choose from a dropdown of ingredients from our database and then add said ingredient from their pantry which will be updated upon clicking. They can also clear their whole pantry or delete individual items with the trash icon. The pantry of the logged in user is displayed below.

RecipeRecommender: On the pantry page to the right, the top recipes in our database that are compatible with their pantry ingredients are displayed on cards in accordian style. The recipes have their name, ingredients, preparation instructions, and the same URL button from the posts.

ProfileFeed: On the profile page on the right, the same exact format as the GrubFeed is displayed but only the logged in user has their posts displayed.

ProfilePhotoUpdate: on the right of the profile page, the user’s name and profile photo (or lack thereof) is displayed. They can choose an image to upload as their profile photo, and by clicking the button below they can change their profile image displayed on this page and in the top right corner of the NavBar. Also, they can update their bio which is displayed below the image.

RecipeSearch: on the recipe page, the user can select from our database of recipes and search for it. This will display the recipes with the same card as the recipe recommender and the associated posts with the recipe.

Social Pages: on the GrubFeed, if a user clicks on the profile picture of another user's post it navigates to that users respective profile page, but there is no option to edit the image or bio.
