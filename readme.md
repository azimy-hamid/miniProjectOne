# Purple Horizon Financial - Mini Project One

## Description

This web application is design to let users become a user and create an account and make deposits and transfers to simulate a small scall bank.
It also contains a web page that gets its data from an external api [this api in particular](https://api.sampleapis.com/fakebank/accounts) visualises it using tables charts graphs and lets the user sort/filter the data.

## Table of Contents

- [Installation](#installation)
- [Usage/Live on the web](#Usage/Live-on-the-web)
- [Running Locally](#Running-Locally)
- [Project Questions](#Project-Questions)

## Installation

1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies using:

- npm install (This will install all the dependencies)

4. Create a `.env` file in the root directory and add the necessary environment variables.

- PORT = 4000
- MONGO_URI = your mongodb atlas URI (it should contain the username and the password both) you can get this link from mongodb atlas when you create an account. It should look something like this: mongodb+srv://username:password@cluster0.mufmax4.mongodb.net/miniProjectOne?retryWrites=true&w=majority&appName=Cluster0
- JWT_SECRET = You can use a password generator to create a password and use it as your JWT Token
- SESSION_SECRET = The same goes here, use a password generator and use it as your session secret

NOTE: As of now, I have not yet implemented JWT Token; however, it's good to have it ready for the future updates.

## Usage/Live on the web

To show a live demo I have deployed the website, so you can click on [this link](https://mini-project-one-two.vercel.app/) to go to website and explore.
One you open the website:

- Make a user account
- Once you make your user account it take you to the dashboard where you can open an account
- Then You can make deposits and transfers
- You can also hop onto the external API link from the navigation bar (Note that it's not the visulaisation of your data, the data come from an external api -- this is because currently the database schema for the website itself is not diverse enough so there not enough data to visualise)

### Running Locally

If you want to run the project locally, you can follow the [installation process](#installation) first and then run the command -> npm install -g nodemon and then run the command -> nodemon app.js

If everything is set up correctly, this should get you going :)

## Project Questions:

### 1. What was your requirements gathering and design process? Was it useful/successful?

While designing this project, I used boostrap for the frontend which made styling really easy and for designing the database schema I deisgned the schema on paper before implementing it using mongodb and mongoose and for designing the api, since I didn't have any experience in creating apis, I just started making end points for each functionality that I needed during the process of making the web app. Also I went through quite a bunch of youtube courses to understand the technologies that I have implemented in this project.

To answer the question of it being successfull or not, I'd say it was successful; however, I didn't use any design tools like figma as it would've taken me some time to learn figma and design the website. So I just continued with designing hte website as I was making it.

Moreover, I to create the api I also used Postmon for testing.

### 2. Give a high level overview of your application and its features

This application lets to create an account and make a deposit to your account or make a transfer to the other accounts on the database and also since the schema and data too short, I have used an external api to fetch some data and visualise it

### 3. Where does its data come from (external/internal APIs)?

The data come from both an internal api and also an external api [this one exactly](https://api.sampleapis.com/fakebank/accounts)

### 4. How is this data processed and displayed?

The data is displayed through tables, charts and graphs. The data itself is processed using vanilla javascript

### 5. How can the user interact with your application?

The user can interact via a simple interface that's available [here](https://mini-project-one-two.vercel.app/)

### 6. What JS techniques have you used (eg. objects, arrays, DOM functions, loops, functions)?

I have used arrays, objects, functions, loops, maps(), find(), filter(), functions, async functions, fetch, DOM functions and more.

### 7. What external tools/libraries have you used (eg. bootstrap/axios/charts)? How? Why?

I have used these libraries and frameworks:

- "bcrypt": "^5.1.1" -- used to encrypt user passwords
- "body-parser": "^1.20.2" -- used to convert the incoming requests into json
- "cookie-parser": "^1.4.6" -- used to store user id for showing the relavent data for each user (It's not secure to store user id into a cookie and should be changed )
- "dotenv": "^16.4.5" -- used to store environment variables to make the website more secure.
- "ejs": "^3.1.10" -- used to create dynamic content in the frontend
- "express": "^4.19.2" -- used to create the server and api
- "express-session": "^1.18.0" -- used to authenticate user and make them stay logged in until logged out.
- "jsonwebtoken": "^9.0.2" -- not implemented yet and might be in the future.
- "mongodb": "^6.8.0" -- used to store the data
- "mongoose": "^8.5.2" -- used to create the shema and models for mongodb
- "validator": "^13.12.0" -- used to validate the inputs that the user enters like email...

I have also used "nodemon": "^3.1.4" for running the server while in development. It's just a dev-dependency

### 8. What kinds of HTML elements have you used (eg. tables, forms, divs, lists, headings, menus, videos, images)?

To name a few, I have used div, header, footer, section, article, nav, p, span, strong, a, ul, li, form, input, button, select, option, table, tr, td and many more.

### 9. What kinds of CSS features have you used (eg. animations, backgrounds, fonts, colours, flexbox, grid)?

To name a few, I have used display: flex, justify-content, align-items, display: grid, grid-template-columns, position: absolute, position: relative, position: fixed, position: sticky, font-family, font-size, font-weight, line-height, text-align, text-decoration, color and many more.

### 10. How might you extend the features of your application in future?

I'll be working on extending the schema, storing the user id in a safer way, since I'd be extending the schema that will give me more data to play with I'll add more sorting and filtering functionalities and I'd be looking for bugs and testing the website against different types of attack such as sql injection...
