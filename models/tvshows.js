const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TvShowsSchema = new Schema({
    title: String,
    category: String,
    banner: Boolean,
    description: String,
    image: String,
    rating: Number,
    premiered: Number,
    background: String
})

module.exports = mongoose.model('TvShows', TvShowsSchema)