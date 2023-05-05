const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cereriStudentiSchema = new Schema({
    nume: {
        type: String,
        required: true
    },
    prenume: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefon: {
        type: String,
        required: true
    },
    universitate: {
        type: String,
        required: true
    },
    facultate: {
        type: String,
        required: true
    },
    studiuUniversitar: {
        type: String,
        required: true
    },
    acteDosar: {
        type: Object,
        requird: false
    },
    stareDosar: {
        type: Boolean,
        requird: false
    },
    mesajRespingereDosar: {
        type: String,
        requird: false
    },
    mesajAprobareDosar: {
        type: String,
        required: false,
    },
    anDeStudiu: {
        type: Number,
        required: true
    },
    statusCerere: {
        type: String, 
        required: true
    },
}, { collection: 'cereriStudenti', versionKey: false, timestamps: true })

const cereriStudenti = mongoose.model('cereriStudenti', cereriStudentiSchema)

module.exports = cereriStudenti;