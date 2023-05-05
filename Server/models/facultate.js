const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultateSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    nume: {
        type: String,
        required: true
    },
    localitate: {
        type: String,
        required: true
    },
    cod_universitate: {
        type: String,
        required: true
    },
    licenta: {
        type: Number,
        required: true
    },
    master: {
        type: Number,
        required: true
    },
    doctorat: {
        type: Number,
        required: true
    },
    cod: {
        type: String,
        required: true
    }
}, { collection: 'facultati', versionKey: false})

const Facultate = mongoose.model('facultati', facultateSchema)

module.exports = Facultate;