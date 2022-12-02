const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const User = require('./models/users');
const TvShow = require('./models/tvshows');
const mongoose = require('mongoose');

// Connection à la BDD
mongoose.connect("mongodb://localhost:27017/streaming-platform");
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
});

// Creation de l'environement Express
const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Necessaire à l'utilisation des fichiers statique dans le dossier public
app.use(express.static("public"));

// Rooting vers le home
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

//CRUD TV shows

app.get('/admin/tvshows', async (req, res) => {
    const tvShows = await TvShow.find({});
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

//Gestion des appels de path non definis
app.all('*', (req, res, next) => {
    throw new Error('Page Not Found');
})



//Lancement du serveur local
app.listen(3000, () => {
    console.log("Listening on port 3000")
})