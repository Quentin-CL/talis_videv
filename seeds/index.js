const mongoose = require('mongoose');
const User = require('../models/users');
const TvShow = require('../models/tvshows');
const { firstnames, lastnames } = require('./seedHelpers');
const axios = require("axios");
mongoose.connect("mongodb://localhost:27017/streaming-platform");

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];
const tvShowsDB = {
    continueWatching: ["Yellowstone", "House of the Dragon", "The Handmaid's Tale", "Young Sheldon"],
    youMightEnjoy: ["Vikings", "Nancy Drew", "The Devil's Hour", "True Blood", "The Rings of Power"],
    trending: ["Criminal Minds", "His Dark Materials", "House of the Dragon", "Peaky Blinders", "Foundation", "Wednesday", "The Boys", "The Curse of Oak Island", "Atlanta", "The Winx Saga"],
    anime: ["One Piece", "Bleach", "Attack on Titan", "Cyberpunk", "Naruto"]
}
const seedDB = async () => {
    // await User.deleteMany({});
    // for (let i = 0; i < 50; i++) {
    //     const firstname = sample(firstnames);
    //     const lastname = sample(lastnames);
    //     const password = Math.floor(Math.random() * 99999);
    //     const user = new User({
    //         firstname,
    //         lastname,
    //         email: `${firstname.toLowerCase()}.${lastname.toLowerCase()}@gmail.com`,
    //         password
    //     });
    //     await user.save();
    // }
    await TvShow.deleteMany({});
    for (const [category, value] of Object.entries(tvShowsDB)) {
        const isBannerNum = Math.floor(Math.random() * value.length);
        let n = 0
        for (const title of value) {
            const tvShowAPI = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${title}`, { headers: { 'Accept-Encoding': 'application/json', } });
            const banner = (n == isBannerNum) ? true : false;
            const tvShow = new TvShow({
                title: tvShowAPI.data.name,
                category,
                banner,
                description: tvShowAPI.data.summary,
                image: tvShowAPI.data.image.medium,
                rating: tvShowAPI.data.rating.average,
                premiered: parseInt(tvShowAPI.data.premiered.slice(0, 4))
            });
            n += 1;
            await tvShow.save();
        }
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});