const routher = require("express").Router();

routher.get('/register', (req, res)=>{
    res.render('auth/register');
})

module.exports = routher;