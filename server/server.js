const express = require('express');
const app = express();

const bodyParser = require('body-parser');

require('./config/config');

// MDH bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.json({
        message: 'Hello World'
    });
});

app.get('/usuario', function (req, res) {
    res.json({
        message: 'getUsuario'
    });
});

app.post('/usuario', function (req, res) {

    const body = req.body;

    if ( body.nombre === undefined ) {
        res.status(400).json({
            ok: false,
            message: 'El nombre es necesario'
        });
    }

    res.json({
        message: 'postUsuario',
        body
    });
});

app.put('/usuario/:id', function (req, res) {
    const id = req.params.id;

    res.json({
        message: `putUsuario ${id}`
    });
});

app.delete('/usuario', function (req, res) {
    res.json({
        message: 'deleteUsuario'
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${ process.env.PORT }`);
});