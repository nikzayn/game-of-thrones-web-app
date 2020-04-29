const express = require('express');
const mongodb = require('mongodb').MongoClient;
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


//Battle location
app.get('/list', (req, res) => {
    const collection = db.collection('battles');
    collection.distinct('location', (err, result) => {
        if (!err) {
            res.send(result);
        }
        return err;
    });
})

//Total number of battles occured
app.get('/count', (req, res) => {
    const collection = db.collection('battles');
    var total = 0;
    collection.find({}).toArray((err, result) => {
        if (!err) {
            for (var i = 0; i < result.length; i++) {
                total += result[i].battle_number;
            }

            res.send({ total });
        }
        return err;
    })
})

// Return list of battles where 'attacker_king' or 'defender_king' was 'Robb Stark'
app.get('/search', (req, res) => {
    const collection = db.collection('battles');
    const { king, location, type } = req.query;
    const params = {
        attacker_king: king,
        defender_king: king,
        location,
        battle_type: type
    }
    collection.find({
        "$and": [{
            $or: [
                { "attacker_king": `${params.attacker_king}` },
                { "defender_king": `${params.defender_king}` }
            ]
        }, {
            "location": `${params.location}`,
            "battle_type": `${params.battle_type}`
        }]
    }).toArray((err, result) => {
        if (!err) {
            res.send(result);
            console.log(req.query);
        }
        return err;
    });
})


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

