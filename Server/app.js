const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Facultate = require('./models/facultate');
const cereriStudenti = require('./models/cereriStudenti');
const { ObjectId } = require('mongodb');

const app = express();

mongoose.connect(`mongodb+srv://alinpricop:alinpricop@clustermetodologii.oabppaj.mongodb.net/proiectMetodologii`)
.then((result) => app.listen(3001)).catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/facultati', (req, res) => {
    Facultate.find().then((result) => {
        res.send(result);
    })
})

app.post('/respingereDosar', async (req, res) => {
    console.log('req.body', req.body);
    const id = new ObjectId(req.body._id);
    await cereriStudenti.updateOne( {_id: id}, {
        $set: {
            stareDosar: false,
            mesajRespingereDosar: req.body.mesajRespingere
            
        },
    }).then((result) => res.send('ok'))
})

app.post('/aprobareDosar', async (req, res) => {
    console.log('req.body', req.body);
    const id = new ObjectId(req.body._id);
    await cereriStudenti.updateOne( {_id: id}, {
        $set: {
            stareDosar: true,
            mesajAprobareDosar: req.body.mesajAprobare
            
        },
    }).then((result) => res.send('ok'))
})

app.post('/acteDosar/:cerere_id', async (req, res) => {
    const id = new ObjectId(req.params.cerere_id);
    await cereriStudenti.updateOne( {_id: id}, {
        $set: {
            acteDosar: req.body,
        },
    }).then((result) => res.send('ok'))
})

app.post('/inregistrareStudent', (req, res) => {
    const cerere = new cereriStudenti(req.body)
    cerere.save().then((result) => {
        res.send('Succes!')
    }).catch((err) => console.log(err));
})

app.get('/cereriStudenti', (req, res) => {
    cereriStudenti.find().then((result) => {
        res.send(result);
    })
})

app.put('/modificareCerere', async (req, res) => {
    const id = new ObjectId(req.body.id);
    const statusCerere = req.body.statusCerere;
    await cereriStudenti.updateOne( {_id: id}, {
        $set: {
            statusCerere: statusCerere,
        },
        $currentDate: { updatedAt: true }
    }
   );
   res.send('Succes!');
})