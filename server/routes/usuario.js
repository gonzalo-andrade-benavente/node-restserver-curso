const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

const Usuario = require('../models/usuario');


app.get('/', function (req, res) {

    res.json({
        message: 'Kaixo Mundua'
    });

});

app.get('/usuario', function (req, res) {

    const desde = req.query.desde || 0;

    const limite = req.query.limite || 5;

    Usuario.find({ estado: true }, 'nombre email role estado img')
        .skip(Number(desde))
        .limit(Number(limite))
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.countDocuments( (err, conteo) => {

                res.json({
                    ok: true,
                    count: conteo,
                    usuarios
                })

            });


        });
});

app.post('/usuario', function (req, res) {

    const body = req.body;

    const usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.put('/usuario/:id', function (req, res) {
    const id = req.params.id;
    const body = req.body;

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });

});

app.delete('/usuario/:id', function (req, res) {
    
    const id = req.params.id; 


    Usuario.findByIdAndUpdate(id, { estado: false } , { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if ( usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

    /* 
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if ( usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    }); */

});

module.exports = app;
