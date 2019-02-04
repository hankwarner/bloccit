# Bloccit
Bloccit is a Reddit-like application for users to share and rate topics and posts. Bloccit has many features such as authentication, 
authorization, creating topics, posts, comments, favoriting, and voting amongst others.

## Getting Started
This app is hosted on Heroku and can be found [here](https://hankwarner-bloccit.herokuapp.com/ "Bloccit Homepage").

### User Sign-Up
First time users should start by visiting the registration page by clicking the 'Sign Up' link in the navigation bar or clicking 
the Sign-up button on the landing page. 

Enter an email and password and click 'Sign-up' and registration is complete. You're now registered as a member of the Bloccit community and can view topics, create posts and comments, save your favorite posts, and upvote/downvote posts.

### View Topics
Click the 'Topics' link in the navigation bar to view a list of all topics. Topics are controlled by administrator users of Bloccit, so basic users will not see a 'New Topic' button here. Click on a topic to view its posts. 

### Create a Post
All signed-in Bloccit users will see a green 'New Post' button on each topic page. Click here, and you'll be brought to a form to create your first post. All that is needed for a post is a title and body (noting the character length limits of each).

### View a Post
From the Topics page, click on a post to view its content, comments, and ratings. Use the form to add your comment, or scroll down to read existing comments. 

### Favorite a Post
From the post view, signed-in users can click the blue 'Favorite' button to mark the post as a favorite. Favorites are saved to the user's profile and can be accessed later by clicking the 'Profile' link in the navigation bar. 

### Rate a Post
From the post view, signed-in users can click the blue up or down arrow to upvote or downvote a post. The total number of votes is displayed next to the arrow icons. 

### View your Profile
Signed-in users can select 'Profile' from the navigation bar to view their latests posts and comments, as well as a list of posts that they have marked as a favorite. 


## Testing
Unit and integration tests are provided by Jasmine and can be found in the `spec` folder. 

## npm Packages/Dependancies:
For a full list of dependancies, visit the `package.json` file. Highlights include:

* PostgreSQL for modeling data in a relational database.
* Sequelize, a promise-based ORM, to handle tasks such as defining models, setting up associations between models, and generating migrations.
* Express for routing and handling middleware.
* EJS (Embedded JavaScript) is the templating engine which renders the client view. It uses JavaScript to generate HTML using simple syntax with fast compilation and rendering times.
* Passport for user authentication. Bloccit implements a stateful session-based authentication system using cookies.
* Bcrypt for encrypting user passwords.
* dotenv for storing environment variables and sensitive API keys.
* Faker for providing the lovely seed data that you see in the production environment.
