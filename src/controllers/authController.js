const routher = require("express").Router();
const authService = require('../services/authService');
const { getErrorMessage } = require("../utils/errorUtils");

routher.get('/register', (req, res)=>{
    res.render('auth/register');
});

routher.post('/register', async (req,res)=>{
    const userData = req.body;

    try {
        await authService.register(userData);

        res.redirect('/auth/login');
    } catch (err) {
        const message = getErrorMessage(err);

        res.render('auth/register', { ...userData, error: message});
    };
});

routher.get('/login', (req,res)=>{
    res.render('auth/login');
});

routher.post('/login', async (req, res)=>{
    const {email, password} = req.body;

    try {
        const token = await authService.login(email, password);

    res.cookie('auth', token);
    
    res.redirect('/')
    } catch (err) {
        const message = getErrorMessage(err);
        res.status(400).render('auth/login', { error: message });
    };
    
});

routher.get('/logout', (req,res)=>{
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = routher;