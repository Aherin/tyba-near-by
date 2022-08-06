const assert = require('assert');
const axios = require('axios').default;

assert(process.env.GOOGLE_MAPS_API_KEY, 'Please set a valid Google Maps API key');

const http = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place',
  timeout: 1000,
  params: {
    key: process.env.GOOGLE_MAPS_API_KEY,
  },
});

module.exports = http;
