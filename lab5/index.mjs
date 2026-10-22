const solarSystem = (await import('npm-solarsystem')).default;

import express from 'express';

// 'express' is an API engine, it lets you make your own APIs
const solar_app = express();

// EJS is a way to dynamically build html pages and easilty subtitute data into them
solar_app.set('view engine', 'ejs');

// Public folder
solar_app.use(express.static('public'));

// Home.ejs
solar_app.get('/', async (req, res) => {
    try {
        let pixabay_results = await fetch('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system');

        if (!pixabay_results.ok) {
            throw new Error('The Pixabay Request Has Failed');
        }

        let pixabay_data = await pixabay_results.json();

        let data = pixabay_data.hits;

        let random_pixabay_images = [];

        for (let i = 0; i < 4; i++) {
            let random = Math.floor(Math.random() * data.length);
            random_pixabay_images.push(data[random].webformatURL);
        }

        res.render('home.ejs', {random_pixabay_images: random_pixabay_images, error_message: ''});
    } catch(error) {
        res.render('home.ejs', {random_pixabay_images: [], error_message: 'Could Not Request The Random Images'});
    }
});

// Planet.ejs
solar_app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;

    let planet_info;

    if (planet === 'Mercury') {
        planet_info = solarSystem.getMercury();
    } else if (planet === 'Venus') {
        planet_info = solarSystem.getVenus();
    } else if (planet === 'Earth') {
        planet_info = solarSystem.getEarth();
    } else if (planet === 'Mars') {
        planet_info = solarSystem.getMars();
    } else if (planet === 'Jupiter') {
        planet_info = solarSystem.getJupiter();
    } else if (planet === 'Saturn') {
        planet_info = solarSystem.getSaturn();
    } else if (planet === 'Uranus') {
        planet_info = solarSystem.getUranus();
    } else if (planet === 'Neptune') {
        planet_info = solarSystem.getNeptune();
    } else if (planet === 'Pluto') {
        planet_info = solarSystem.getPluto();
    } else {
        return res.status(400).send('Planet Not Found');
    }

    res.render('planet.ejs', {name: planet, image: planet_info.image, planet_info: planet_info});
});

// Asteroids for Asteroid_Comet.ejs
solar_app.get('/asteroids', (req, res) => {
    let asteroid_info = solarSystem.getAsteroids();

    res.render('asteroid_comet.ejs', {name: 'Asteroids', object_info: asteroid_info});
});

// Comets for Asteroid_Comet.ejs
solar_app.get('/comets', (req, res) => {
    let comet_info = solarSystem.getComets();

    res.render('asteroid_comet.ejs', {name: 'Comets', object_info: comet_info});
});

// NasaAPOD.ejs
solar_app.get('/nasaAPOD', async (req, res) => {
    try {
        let nasa_apod_results = await fetch('https://science.nasa.gov/wp-json/wp/v2/apod-basic/');

        if (!nasa_apod_results.ok) {
            throw new Error('The NASA APOD Request Has Failed');
        }

        let nasa_apod_data = await nasa_apod_results.json();

        let nasa_apod = nasa_apod_data[0];

        nasa_apod.url = nasa_apod.hdurl;

        res.render('nasaAPOD.ejs', {nasa_info: nasa_apod, error_message: ""});
    } catch (error) {
        res.render('nasaAPOD.ejs', {nasa_info: null, error_message: 'Could Not Request NASA Picture Of The Day'});
    }
});

// Starting the server
solar_app.listen(3000, () => {
    console.log('Solar System Server Started!')
});