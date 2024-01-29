const Movie = require('../models/Movie');
const Cast = require('../models/Cast');

exports.getAll = () => Movie.find();


exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');
;

//TODO: filter result in mongoDB
exports.search = (title, genre, year) => {
    let query = {};

    if (title) {
        query.title = new RegExp(title, 'i');
    };

    if (genre) {
        query.genre = genre.toLowerCase();
    };

    if (year) {
        query.year  = year;
    };

    return Movie.find(query);
};

exports.create = (movieData) => Movie.create(movieData);

exports.attach = async (movieId, castId) => {
    // return Movie.findByIdAndUpdate(movieId, { $push: {casts: castId}});

    const movie = await this.getOne(movieId);
    const cast = await Cast.findById(castId);

    if (!cast) {
        throw new Error('Cast not exist!')
    }

    movie.casts.push(cast);
    cast.movies.push(movie);

    await movie.save();
    await cast.save();

    return movie;
}