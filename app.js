const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const User = require('./models/users');
const TvShow = require('./models/tvshows');
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/streaming-platform");

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', async (req, res) => {
    const tvShowsBanner = await TvShow.find({ banner: true });
    //Ajout du premier element en dernier pour génerer un defilement continu de la bannière
    tvShowsBanner.push(tvShowsBanner[0])
    const continueWatching = await TvShow.find({ category: "continueWatching" });
    const trending = await TvShow.find({ category: "trending" });
    const anime = await TvShow.find({ category: "anime" })
    const youMightEnjoy = await TvShow.find({ category: "youMightEnjoy" });
    res.render('home', { tvShowsBanner, continueWatching, trending, anime, youMightEnjoy })
})




// ***************************************************
// Admin
// ***************************************************
app.get('/admin', (req, res) => {
    res.render('admin');
})
app.get('/admin/users', async (req, res) => {
    const users = await User.find({});
    res.render('users/index', { users });
})
app.get('/admin/users/new', (req, res) => {
    res.render('users/new');
})

app.get('/admin/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("users/show", { user });
})

app.get('/admin/users/:id/edit', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("users/edit", { user });
})

app.get('/admin/tvshows', async (req, res) => {
    const tvShows = await TvShow.find({});
    // const tvshows = await Promise.all(tvShowsSelec.map(async tvShowSelec => await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${tvShowSelec.title}`, { headers: { 'Accept-Encoding': 'application/json', } })));
    res.render('tv_shows_admin/index', { tvShows });
})
app.get('/admin/tvshows/new', (req, res) => {
    res.render("tv_shows_admin/new");
})
app.get('/admin/tvshows/:id', async (req, res) => {
    const { id } = req.params;
    const tvShow = await TvShow.findById(id);
    res.render("tv_shows_admin/show", { tvShow });
})
app.get('/admin/tvshows/:id/edit', async (req, res) => {
    const { id } = req.params;
    const tvShow = await TvShow.findById(id);
    res.render("tv_shows_admin/edit", { tvShow });
})

app.all('*', (req, res, next) => {
    throw new Error('Page Not Found');
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render("error", { err });
})




app.listen(3000, () => {
    console.log("Listening on port 3000")
})