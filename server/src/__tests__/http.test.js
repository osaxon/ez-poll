/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const request = require('supertest');
const { app } = require('../app');
const { closeDatabaseConnection } = require('../db/index');
const { beforeAll, afterAll } = require('@jest/globals');
const { initMigrations } = require('../db/index');

beforeAll(() => initMigrations());
afterAll(() => closeDatabaseConnection());

describe('/pulse', () => {
  test('GET:200 server responds with OK status and message', () => {
    return request(app)
      .get('/pulse')
      .expect(200)
      .then(({ body }) => expect(body).toEqual({ pulse: 'ok' }));
  });
});

describe('/login', () => {
  test('GET:200 logs a user in using email and password', () => {
    return request(app)
      .post('/user/login')
      .send({
        email: 'oliverrsaxon@gmail.com',
        password: process.env.TEST_USER_PASSWORD,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.user.id).toBe(1);
      });
  });
});
