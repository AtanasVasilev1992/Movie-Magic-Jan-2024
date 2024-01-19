const router = require("express").Router();

router.get("/", (req, res)=>{
    res.render('home');
});

router.get('/about', (req,res)=>{
    res.render('about')
});

router.all('*', (req,res)=>{
    res.render('404');
});

module.exports = router;