const ObjectID =  require('mongodb').ObjectID;
const db = require('../db');

exports.all = function (req, res) {
    db.get().collection('users').find().toArray(function (err,docs) {
        if(err)
        {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
};

exports.view = function (req, res) {
    try{
        db.get().collection('users').findOne({"_id":ObjectID(req.params.id)},function (err,doc) {
            if(err)
            {
                console.log(err);
                return res.sendStatus(500);
            }
            if(doc)
                res.send(doc);
            else
                res.sendStatus(404);
        })
    }catch (e) {
        res.send(e.message);
    }
};

exports.create = function (req, res) {
    db.get().collection('users').insertOne({
        name : req.body.name,
        surname : req.body.surname,
        fname : req.body.fname
    }, function (err, doc) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};

exports.update = function (req, res) {
    db.get().collection('users').updateOne(
        {"_id": ObjectID(req.params.id)},
        { $set: {
                name : req.body.name,
                fname : req.body.fname,
                surname : req.body.surname
            }
        }, function (err,doc) {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
};


exports.delete = function (req, res) {
    try{
        db.get().collection('users').removeOne(
            {_id: ObjectID(req.params.id)},
            function (err,doc) {
                if(err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.sendStatus(200);
            });
    }catch (e) {
        res.send(e.message);
    }
};



