# Project Name

Purple Horizon Financial - Mini Project One

## Description

This web application is design to let users become a user and create an account and make deposits and transfers to simulate a small scall bank.
It also contains a web page that gets its data from an external api [this api in particular] (https://api.sampleapis.com/fakebank/accounts) visualises it using tables charts graphs and lets the user sort/filter the data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Installation

1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies using:

- npm install

4. Create a `.env` file in the root directory and add the necessary environment variables.

- PORT = 4000
- MONGO_URI = your mongodb atlas URI (it should contain the username and the password both) you can get this link from mongodb atlas when you create an account. It should look something like this: mongodb+srv://<username>:<password>@cluster0.mufmax4.mongodb.net/miniProjectOne?retryWrites=true&w=majority&appName=Cluster0
- JWT_SECRET = You can use a password generator to create a password and use it as your JWT Token
- SESSION_SECRET = The same goes here, use a password generator and use it as your session secret

NOTE: As of now, I have not yet implemented JWT Token; however, it's good to have it ready for the future updates.

## Usage/Live on the web

To show a live demo I have deployed the website, so you can click on [this link] (https://mini-project-one-two.vercel.app/) to go to website and explore.
One you open the website:

- Make a user account
- Once you make your user account it take you to the dashboard where you can open an account
- Then You can make deposits and transfers
- You can also hop onto the external API link from the navigation bar (Note that it's not the visulaisation of your data, the data come from an external api -- this is because currently the database schema for the website itself is not diverse enough so there not enough data to visualise)

### Running Locally

If you want to run the project locally, you can follow the [installation process](#installation) first and then run the command -> npm install -g nodemon and then run the command -> nodemon app.js

If everything is set up correctly, this should get you going :)
