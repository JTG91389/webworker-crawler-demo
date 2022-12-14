const { parentPort } = require('worker_threads');
const db = require('../models');

// //firebase credentials
// let firebaseConfig = {
//     apiKey: "XXX-XXXX-XXXX-XXX",
//     authDomain: "XXX-XXX-XXX-XXX",
//     databaseURL: "XXX-XXXX-XXXX-XXX",
//     projectId: "XXX-XXXX-XXXX-XXX",
//     storageBucket: "XXX-XXXX-XXXX-XXXX",
//     messagingSenderId: "XXX-XXXX-XXXX-XXXX",
//     appId: "XXX-XXXX-XXXX-XXXX"
// };

// Initialize Firebase
// admin.initializeApp(firebaseConfig);
// let db = admin.firestore();

// get current data in DD-MM-YYYY format
let date = new Date().toISOString();

// recieve crawled data from main thread
parentPort.once("message", async (message) => {
    console.log("Recieved data from mainWorker...");

    // store data gotten from main thread in database
    const dbPromArr = [];
    Object.keys(message).forEach((currencyKey) => {
        dbPromArr.push(db.currency.create({
            unit: currencyKey,
            value: parseFloat(message[currencyKey]),
        }))
    })
    console.log(message);
    await Promise.all(dbPromArr);  
});