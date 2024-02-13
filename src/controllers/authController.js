const routher = require("express").Router();
const authService = require('../services/authService')

routher.get('/register', (req, res)=>{
    res.render('auth/register');
});

routher.post('/register', async (req,res)=>{
    const userData = req.body;

    try {
        await authService.register(userData);

        res.redirect('/auth/login');
    } catch (err) {
        res.render('auth/register', {error: err.message});
    };
});

routher.get('/login', (req,res)=>{
    res.render('auth/login');
});

routher.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    const token = await authService.login(email, password);

    res.cookie('auth', token);
    
    res.redirect('/')
});

routher.get('/logout', (req,res)=>{
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = routher;