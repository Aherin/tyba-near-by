// noinspection JSUnresolvedVariable

const http = require('../http/axios.http');

const findPlacesByCity = (city) => http.get('/findplacefromtext/json', {
  params: {
    input: `restaurant ${city}`,
    inputtype: 'textquery',
    fields: 'formatted_address,name,rating,opening_hours',
  },
});

const findPlacesByCoords = (coords) => http.get('/nearbysearch/json', {
  params: {
    location: `${coords.lat},${coords.lng}`,
    radius: '1500',
    type: 'restaurant',
    keyword: 'restaurant',
  },
});

module.exports = { findPlacesByCity, findPlacesByCoords };
