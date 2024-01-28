const router = require("express").Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');

router.get('/create', (req, res)=>{
    res.render('create')
});

router.post('/create', async (req,res)=>{
    const newMovie = req.body;
    try {
        await movieService.create(newMovie);
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
        res.redirect('/create');
    }
});

router.get('/movies/:movieId', async (req, res)=>{
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    movie.rating = new Array(movie.rating).fill(true)
    //movie.ratingStars = '&#x2605;'.repeat(movie.rating)

    res.render('details', { movie })
});

router.get('/movies/:movieId/attach', async (req,res)=>{
    const movie = await movieService.getOne(req.params.movieId).lean();
    const cast = await castService.getAll().lean()

    res.render('movie/attach', { ...movie, cast });
});

router.post('/movies/:movieId/attach', async (req,res)=>{
    const castId = req.body.cast;
    const movieId = req.params.movieId
    
    await movieService.attach(movieId, castId);
    res.redirect(`/movies/${movieId}/attach`);
});


module.exports = router;