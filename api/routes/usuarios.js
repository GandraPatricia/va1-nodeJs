const express = require ("express");
const router = express.Router();
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");

const Usuario = require("../models/usuarios");

router.post("/signin", (req, res, next) => {
    console.log(req.body);
    Usuario.find({ email: req.body.email })
    .exex()
    .then(usuario => {
        if(usuario.length >=1){
        return res.status(409).json({
            message: "email já existe"
        }),
    } else {
        bcrypt.hash(req,body,password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                const usuario = new Usuario({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });  
                usuario
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201),json({
                        message: "Usuario criado."
                    });
                })  
                .catch(err => {
                    console.log(err);
                res.status(500).json({
                    error:err
                });
              }) ;
    }
});
    }
});
});
router.post("/login", (req, res, next) => {
    console.log(req.body);
    Usuario.find({ email: req.body.email })
    .exex()
    .then(usuario.length < 1){
        return res.status(401).json({
            message: "Usuario não cadastrado"
        });
    }
    bcrypt.compare(req.body.password, usuario[0].password, err)
    if(err){
        return res.status(401).json({
            message: "falha na autenticação"
        });
    }
    if (result){
        const token = jwt.sign(
            {
              email: usuario[0].email,
              id: usuario[0]._id  
            },
            process.env.PRIVATE_KEY
            ,
            {
                expiresIn: "1h"
            }
        );
        return res.status(200).json({
            message: "autenticado com sucesso",
            token: token
        });
    }
    res.status(401).json({
        message: "falha na autenticação"

    });
});
})
.catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
});

