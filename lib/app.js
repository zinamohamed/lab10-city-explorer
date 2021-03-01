const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const { formatLocation, formatWeather, formatYelp } = require('./munge-functions.js');

app.get('/location', async(req, res) => {
  try {
    const cityName = req.query.search;
    const locationData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODING_API_KEY}&q=${cityName}&format=json`);
    const formattedResponse = formatLocation(locationData.body);
    
    res.json(formattedResponse);
  } catch (e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {    
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
    
    const finalResponse = formatWeather(weatherData.body);

    res.json(finalResponse);

  } catch (e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/reviews', async(req, res) => {

  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;


    const yelpData = await request
      .get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`)
      .set({ 'Authorization' : `Bearer ${process.env.YELP_API_KEY}` });

    const returnYelp = formatYelp(yelpData.body);  

    res.json(returnYelp);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
