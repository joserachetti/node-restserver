const express = require('express');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
let app = express();
let Producto = require('../models/producto');


/*=============================================
=             Obtener productos               =
=============================================*/

app.get('/productos', verificaToken, (req, res) => {

    Producto.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            });
        })

});


/*=============================================
=        Obtener productos por ID             =
=============================================*/

app.get('/productos/:id', verificaToken, (req, res) => {


    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: { message: 'El ID no es valido' }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });


    })

});

/*=============================================
=             Buscar productos               =
=============================================*/

app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino

    let regex = new RegExp(termino, 'i')

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            });
        })



});


/*=============================================
=        Ingresar producto            =
=============================================*/

app.post('/productos', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({

        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });


    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });


    });


});

/*=============================================
=       Actualizar producto            =
=============================================*/

app.put('/productos/:id', verificaToken, (req, res) => {


    let body = req.body;
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: { message: 'El ID no existe' }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precio,
            productoDB.descripcion = body.descripcion,
            productoDB.disponible = body.disponible,
            productoDB.categoria = body.categoria,

            productoDB.save((err, productoGuardado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    producto: productoGuardado
                });


            })


    })


});



/*=============================================
=       Eliminar producto            =
=============================================*/

app.delete('/productos/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id

    Producto.findByIdAndRemove(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: { message: 'El ID no existe' }
            });
        }
        res.json({
            ok: true,
            message: 'Producto Borrado'
        })
    });

});


module.exports = app;