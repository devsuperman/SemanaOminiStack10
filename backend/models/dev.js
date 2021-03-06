const mongoose = require('mongoose');
const PointSchema = require('./utils/pointSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    bio: String,
    github_username: String,
    avatar_url:String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Devs', DevSchema);