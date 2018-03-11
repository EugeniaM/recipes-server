'use strict';

const admin = require('firebase-admin');

const serviceAccount = require('./vendors/credentials/recipes-app-388be-firebase-adminsdk-lkgp5-183657e3ee.json');

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://recipes-app-388be.firebaseio.com"
});

console.log("Start firebase database connection");
console.log("databaseURL: https://recipes-app-388be.firebaseio.com");
module.exports = firebase;