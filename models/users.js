const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
})

module.exports = mongoose.model('Users', UsersSchema)