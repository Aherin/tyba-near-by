/* eslint-disable no-undef,no-underscore-dangle */
// noinspection JSUnresolvedFunction

const request = require('supertest');
const app = require('../../index');
const User = require('../models/user.model');
const { clearUserTable, clearTransactionTable } = require('../database/database.tools');

let accessToken = '';

beforeAll(clearUserTable);

test('should register a new user', async () => {
  const response = await request(app).post('/v1/api/tyba-ms/user/register').send({
    first_name: 'John',
    last_name: 'Doe',
    email: 'myemail@example.com',
    password: '12345678',
  }).expect(201);
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
});

test('should not register a new user when already registered', async () => {
  await request(app).post('/v1/api/tyba-ms/user/register').send({
    first_name: 'John',
    last_name: 'Doe',
    email: 'myemail@example.com',
    password: '12345678',
  }).expect(400);
});

test('should login user', async () => {
  const response = await request(app).post('/v1/api/tyba-ms/user/login').send({
    email: 'myemail@example.com',
    password: '12345678',
  }).expect(200);

  accessToken = response.body.accessToken;
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
});

test('should not login user when credentials are invalid', async () => {
  await request(app).post('/v1/api/tyba-ms/user/login').send({
    email: 'notmyemail@example.com',
    password: '12345678910',
  }).expect(400);
});

test('should get a restaurant object info from bogota city param', async () => {
  const response = await request(app).get('/v1/api/tyba-ms/places/bogota')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200);

  expect(response.body.length).toBeGreaterThanOrEqual(1);
});

test('should get a restaurants list response from nearby coordinates', async () => {
  const response = await request(app).get('/v1/api/tyba-ms/places/?lat=4.624335&lng=-74.063644')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200);
  expect(response.body.length).toBeGreaterThanOrEqual(1);
});

test('should get list of recently transactions', async () => {
  await clearTransactionTable();
  const response = await request(app).get('/v1/api/tyba-ms/transaction-history')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200);
  expect(response.body.length).toBeGreaterThanOrEqual(1);
});

test('should logout user', async () => {
  const response = await request(app).post('/v1/api/tyba-ms/user/logout')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200);

  expect(response.body).toMatchObject({
    message: 'Logged Out Successfully',
  });
});

test('should not logout user a second time', async () => {
  const response = await request(app).post('/v1/api/tyba-ms/user/logout')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(401);

  expect(response.body).toMatchObject({
    errorMessage: 'Error occurred during authentication, please check your credentials',
  });
});

afterAll(clearUserTable);
afterAll(clearTransactionTable);
