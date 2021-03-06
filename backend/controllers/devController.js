const axios = require('axios');
const Dev = require('../models/dev');
const parseStringToArray = require('../utils/parseStringToArray');

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, longitude, latitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, bio, avatar_url } = apiResponse.data;

            const techsArray = parseStringToArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
        }

        return response.json(dev);
    },

    async destroy(request, response) {
        
        const github_username = request.params.id;
        
        const res = await Dev.findOneAndDelete({github_username}) ;

        return response.json(res.deletedCount);
    }
}