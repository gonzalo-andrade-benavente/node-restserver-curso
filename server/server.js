const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
require('./config/config');

// MDH bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use( require('./routes/usuario') );

// mongodb+srv://root:root@cluster0.skhs1.mongodb.net/cafe?retryWrites=true&w=majority

const connectDB = async () => {

    await mongoose.connect(process.env.URL_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    console.log('Conectado a mongoDB');

}

const initDB = () => {

    try {
        connectDB();
    } catch (err) {
        //console.log('Error al intentar conectar mongoDB', err);
        throw err;
    }

}

initDB();

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});