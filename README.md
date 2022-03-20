# AA Times
This application is a news feed web application based on the NYTimes APIs.
Features:
1. User can **browse** news in various topics like "US", "Health", "Technology" etc.
1. User can **pin** news article. this will save the news articles so that the user can read it later.

This application is hosted at https://aa-times.herokuapp.com/

## Sample API Request / Response
[SAMPLE_REQUEST_RESPONSE.md](SAMPLE_REQUEST_RESPONSE.md)

## App ScreenShots

### Homepage

- Renders the news feed showcasing the header, footer and links to other topics

![homepage](https://res.cloudinary.com/dpdawijui/image/upload/v1647765914/screencapture-homepage_compressed_emrrh4.jpg)

### User page

- Renders the pinned articles of the user

![userpage](https://res.cloudinary.com/dpdawijui/image/upload/v1647764862/screencapture-userpage_k3zoqh.png)

### SignIn

![signin](https://res.cloudinary.com/dpdawijui/image/upload/v1647764843/screencapture-signin_nybqbz.png)

### SignUp

    - Validates and renders error if user data is incorrect

![signup](https://res.cloudinary.com/dpdawijui/image/upload/v1647764851/screencapture-signUp_r3kufh.png)


## Architecture Diagram

![archiDia](https://res.cloudinary.com/dpdawijui/image/upload/v1647764981/aa_times_spkv04.jpg)

## Database Diagram
![dbdiagram](https://res.cloudinary.com/dpdawijui/image/upload/v1647763254/AATimes_DB_ujl4su.png)

## Frameworks / Technologies
1. Express - Server
1. ReactJS - Javascript library
1. Redux - for state management
1. Material UI - standard reusable React components
1. TypeScript - language
1. PostgreSQL - for database
1. Heroku - for hosting

## Code Organization
The code is organized in 2 major directories "backend" and "frontend".

### Backend
1. [db](backend/db): auto generated files
1. [routes](backend/routes): API routes
1. [utils](backend/utils): common

### Frontend
1. [components](frontend/components): Custom reusuable React components.
1. [models](frontend/models): Is the classes in the domain.
1. [store](frontend/store): Is the redux store. which abstracts the connection from fronend to backend APIs.


## Accessibility Features:
1. All the links have descriptive text as per the guidelines in https://www.w3.org/TR/wai-aria-practices/#link
1. All the topic pages have a unique, descriptive and dynamic title. for e.g. "a/A Times - Health", "a/A Times - Technology"
1. Error messages on the signin, signup pages use standard MUI Alert component which set the correct alert_role https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role
1. Tooltip has been added for disabled ping buttons. for e.g. "Only logged in users can pin articles. Please login".

## Future Improvements:
1. pagination
1. unit testing

## Learnings:
1. Typescript - this was the first time I used Typescript. The language made better structured code possible.
1. Material UI - material UI is a powerful set of ReactJS components.
1. Accessibility Best Practices that make the webpages more widely accessible to all users.

## Instructions to run the Application locally

### Setup the backend server
```
cd backend

cp .env.example .env
vi .env
# NOTE: set the right DB password, NYT API key
# NOTE: change USE_REAL_DATA=true, if not mock data will be used.

# install dependencies
npm install

# undo db seed if necessary
# npx dotenv sequelize db:seed:undo

# undo db migrate if necessary
# npx dotenv sequelize db:migrate:undo

# db migrate
npx dotenv sequelize db:migrate

# db seed
npx dotenv sequelize db:seed

# start the server
npm start
```

### Setup the frontend server

```
cd frontend

# install dependencies
npm install

# start the server
npm start
```

## Instructions to run the Application on heroku

    Create the app in Heroku application and follow the below steps in the terminal.
```
heroku login
heroku git:remote -a <name-of-Heroku-app>
git push heroku main
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all
```

## Credits
1. For this project I have used an existing starter code that I have used in my App Academy coding bootcamp. But migrated it to use TypeScript.

## References:
1. https://developer.nytimes.com/apis
1. https://mui.com/
1. https://create-react-app.dev/docs/adding-typescript/
