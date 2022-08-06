// noinspection JSUnresolvedVariable,ExceptionCaughtLocallyJS

const express = require('express');
const log = require('../services/logger.service');
const authenticate = require('../middleware/security.auth');
const { findPlacesByCity, findPlacesByCoords } = require('../services/place.service');

const router = new express.Router();

router.get('/:city', authenticate, async (req, res) => {
  const { city } = req.params;
  const hasNumbers = /\d/;

  try {
    if (hasNumbers.test(city)) throw new Error('param (city) is not a valid name, must contain only letters');
    const response = await findPlacesByCity(city);
    const { candidates } = response.data;
    log.info(`/places/${city}, status response: ${response.status}`);
    res.status(200).send(candidates);
  } catch (error) {
    log.error(error.message);
    res.status(500).send({ errorMessage: error.message });
  }
});

router.get('/', authenticate, async (req, res) => {
  const coords = req.query;
  const isEmpty = Object.keys(coords).length === 0;

  try {
    if (isEmpty) throw new Error('Query params are missing');
    const response = await findPlacesByCoords(coords);
    const { results } = response.data;
    const restaurants = results.map((restaurant) => ({
      name: restaurant.name,
      opening_hours: restaurant.opening_hours,
      rating: restaurant.rating,
      user_ratings_total: restaurant.user_ratings_total,
    }));
    log.info(`/places?lat=${coords.lat}&lng=${coords.lng}, status response: ${response.status}`);
    res.status(200).send(restaurants);
  } catch (error) {
    log.error(error.message);
    res.status(500).send({ errorMessage: error.message });
  }
});

module.exports = router;
