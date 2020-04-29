const express = require('express');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');

//Express Config
const app = express();

//Port
const port = 8080;

//Body parser 
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbName = process.env.MONGO_DB;


//DB Config
//Mongo URL Connection
const MONGO_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;


app.get('/list', (req, res) => {
    const collection = db.collection('battles');
    collection.find({}).toArray(function (err, docs) {
        res.send(docs);
    });

})

// app.get('/count', (req, res) => {
//     collection.
// })


app.listen(port, () => {
    mongodb.connect(MONGO_URL, { useUnifiedTopology: true }, (err, client) => {
        console.log(`Listening on port ${port}`);
        if (err) {
            console.log('Not Connected', err);
            return;
        }


        db = client.db(dbName);

        console.log('connected to database', dbName);
    })
})

