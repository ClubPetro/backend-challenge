var env = require('dotenv').config()
var mongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;


mongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db(process.env.MONGODB_DB))
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

function findPlaceCountry(consulta, callback) {
    global.conn.collection("places").find({ country_id: consulta.country_id, place: consulta.place }).toArray(callback);
}

function edit(item, callback) {

    id = item.id
    place = item.place
    meta = item.meta
    data_edicao = item.data_edicao

    global.conn.collection("places").updateOne({ _id: new ObjectId(id) }, {
        $set: {
            place: place,
            meta: meta,
            data_edicao: data_edicao,
        }
    }, callback);

}

function addCountry(item, callback) {
    global.conn.collection("countrys").insertOne(item, callback);
}

function findAllCountrys(callback) {
    global.conn.collection("countrys").find({}).sort({ nome: 1 }).toArray(callback);
}

function findCountryNome(nome, callback) {
    global.conn.collection("countrys").find({ nome: nome }).sort({ nome: 1 }).toArray(callback);
}

function findOneCountry(id, callback) {
    global.conn.collection("countrys").find({ _id: new ObjectId(id) }).toArray(callback);
}

function delCountry(id, callback) {
    global.conn.collection("countrys").deleteOne({ _id: new ObjectId(id) }, callback);
}
module.exports = { add, del, findOne, edit, findAll, addCountry, findAllCountrys, findOneCountry, findPlaceCountry, findCountryNome, delCountry };