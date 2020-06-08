const jwt = require('jsonwebtoken');


module.exports = (req, res, next)=> {
    try{
        const token = req.headers.authorization.split(" ")[1];
     const privatekey ="123321";

    const decoded = jwt.verify(token, privatekey, {algorithm:'HS256'});
    next();

    }
    catch(error){
        return res.status(401).json ({message: 'Não autenticado'});

    }
    const token = req.headers.authorization.split(" ")[1];
     const privatekey ="123321";

    const decoded = jwt.verify(token, privatekey, {algorithm:'HS256'});
};