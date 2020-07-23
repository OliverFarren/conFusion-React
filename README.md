# conFusion-React

## About
Developed through Coursera learning course:<br>
-- Full-Stack Web Development with React Specialization<br>
-- Jogesh K. Muppala h <br>
-- The Hong Kong University of Science and Technology<br>

## Contents

Demo Ristorante conFusion website that explores key React library concepts

## How to Run

to start using the application, go to your terminal, in the root directory of this project and type:

```
git clone https://github.com/OliverFarren/conFusion-React
```

Next you will need to install all the packages:

```
npm install package.json
npm install -g json-server
```

This will install all the packages needed to successfully start up the application.

Since This React App was developed prior to the conFusion server it only connects to a simple json-server. This will need to be running before starting the App.

To start the json-server, in a command window, type:
```
cd json-server
json-server --watch db.json --host 0.0.0.0 -p 3001 -d 2000
```

Now start the React App

```
npm start
```

This should open up the website at localhost:3000/home



