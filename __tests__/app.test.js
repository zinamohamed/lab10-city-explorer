require('dotenv').config();

const { formatWeather, formatYelp, formatLocation } = require('../lib/munge-functions.js');


test('gets weather from search params', async() => {

  const expectation = [
    {
      'forecast': 'Overcast clouds',
      'time': 'Sat Feb 27 2021'
    }];

  const actualData = {
    data: [
      {
        'moonrise_ts': 1614474955,
        'wind_cdir': 'WSW',
        'rh': 89,
        'pres': 1014.75,
        'high_temp': 7.8,
        'sunset_ts': 1614477306,
        'ozone': 365.53125,
        'moon_phase': 0.974645,
        'wind_gust_spd': 10.8984375,
        'snow_depth': 0,
        'clouds': 78,
        'ts': 1614412860,
        'sunrise_ts': 1614437449,
        'app_min_temp': -1.1,
        'wind_spd': 2.5517251,
        'pop': 30,
        'wind_cdir_full': 'west-southwest',
        'slp': 1025.4375,
        'moon_phase_lunation': 0.55,
        'valid_date': '2021-02-27',
        'app_max_temp': 7.8,
        'vis': 24.096,
        'dewpt': 3.2,
        'snow': 0,
        'uv': 1.924256,
        'weather': {
          'icon': 'c04d',
          'code': 804,
          'description': 'Overcast clouds'
        },
        'wind_dir': 241,
        'max_dhi': null,
        'clouds_hi': 17,
        'precip': 0.4375,
        'low_temp': 2.8,
        'max_temp': 7.8,
        'moonset_ts': 1614441402,
        'datetime': '2021-02-27',
        'temp': 5,
        'min_temp': 2.7,
        'clouds_mid': 28,
        'clouds_low': 78
      }
    ]
  };

  const data = formatWeather(actualData);

  expect(data).toEqual(expectation);
});

test('return requested rest.', async() => {


  const expectation = [{
    name: 'Luc Lac',
    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
    price: '$$',
    rating: 4.0,
    url: 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=W4-fw5orI81WMg21PQOASQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=W4-fw5orI81WMg21PQOASQ',
  }];

  const actualData = {
    businesses: [
      {
        'name': 'Luc Lac',
        'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
        'is_closed': false,
        'url': 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=W4-fw5orI81WMg21PQOASQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=W4-fw5orI81WMg21PQOASQ',
        'review_count': 3205,
        'rating': 4.0,
        'price': '$$',

      }
    ]
  };

  const data = formatYelp(actualData);


  expect(data).toEqual(expectation);
});

test('returns city location', async() => {

  const expectation = 
    {
      formatted_query: 'Portland, Multnomah, Oregon, USA',
      latitude: '45.5202471', 
      longitude: '-97.3233874'
    };

  const actual = [
    {
      lat: '45.5202471',
      lon: '-97.3233874',
      display_name: 'Portland, Multnomah, Oregon, USA',
    }];

  const data = formatLocation(actual);

  expect(data).toEqual(expectation);
});

