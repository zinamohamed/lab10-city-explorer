  
function formatLocation(someData) {
  return {
    formatted_query: someData[0].display_name,
    latitude: someData[0].lat,
    longitude: someData[0].lon,
  };
}

function formatWeather(weatherData) {
  const formattedResponse = weatherData.data.map(weatherItem => {
    return {
      forecast: weatherItem.weather.description,
      time: new Date(weatherItem.ts * 1000).toDateString(),
    };
  });

  const finalResponse = formattedResponse.slice(0, 7);
  return finalResponse;
}

function formatYelp(yelpData) {
  const yelpSingleData = yelpData.businesses;
  const formatResponse = yelpSingleData.map(yelpItem => {
    return {
      name: yelpItem.name,
      image_url: yelpItem.image_url, 
      price: yelpItem.price,
      rating: yelpItem.rating,
      url: yelpItem.url
    };
  });
  return formatResponse;
}

module.exports = {
  formatLocation,
  formatWeather,
  formatYelp
};