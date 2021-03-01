require('dotenv').config();

const { formatWeather } = require('../lib/munge-functions.js');


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


