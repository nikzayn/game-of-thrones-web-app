const express = require('express');

const router = express.Router();

// @type GET
// @route /api/lists
// @desc List of Battles
// acces PUBLIC
router.get('/lists', (req, res) => {
    const collection = db.collection('battles');
    collection.find({}).toArray(function (err, docs) {
        res.send(docs);
    });
})