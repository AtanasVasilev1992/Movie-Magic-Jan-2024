const routher = require("express").Router();
const authService = require('../services/authService')

routher.get('/register', (req, res)=>{
    res.render('auth/register');
});

routher.post('/register', async (req,res)=>{
    const userData = req.body;
    await authService.register(userData);
    res.redirect('/auth/login');
});

module.exports = routher;