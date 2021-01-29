var mongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;


mongoClient.connect("mongodb+srv://clubpetro:clubpetro@cluster0.d4gur.mongodb.net/desafio?retryWrites=true&w=majority", { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db("desafio"))
    .catch(err => console.log(err))

function add(item, callback) {
    global.conn.collection("places").insertOne(item, callback);
}

function del(id, callback) {
    global.conn.collection("places").deleteOne({ _id: new ObjectId(id) }, callback);
}

function findAll(callback) {
    global.conn.collection("places").find({}).sort({ meta: 1 }).toArray(callback);
}

function findOne(id, callback) {
    global.conn.collection("places").find({ _id: new ObjectId(id) }).toArray(callback);
}

function findPlaceCountry(country_id, callback) {
    global.conn.collection("places").find({ country_id: country_id }).toArray(callback);
}

function edit(item, callback) {

    id = item.id
    local = item.local
    meta = item.meta

    global.conn.collection("places").updateOne({ _id: new ObjectId(id) }, {
        $set: {
            local: local,
            meta: meta,
        }
    }, callback);

}

function addCountry(item, callback) {
    global.conn.collection("countrys").insertOne(item, callback);
}

function findAllCountrys(callback) {
    global.conn.collection("countrys").find({}).toArray(callback);
}

function findOneCountry(id, callback) {
    console.log(id)
    global.conn.collection("countrys").find({ _id: new ObjectId(id) }).toArray(callback);
}
module.exports = { add, del, findOne, edit, findAll, addCountry, findAllCountrys, findOneCountry, findPlaceCountry };