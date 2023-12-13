/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const request = require('supertest');
const { app } = require('../app');
const { closeDatabaseConnection } = require('../db/index');
const { beforeAll, afterAll } = require('@jest/globals');
const { initMigrations } = require('../db/index');

let token = '';
beforeAll(async () => {
  // these Auth0 credentials are NOT for the the SPA app configured for the front end.
  // TODO need to understand why the same credentials for authorisation on the front end doesn't work here
  // for now these creds are for a machine-to-machine app configured with permissions to this API
  // works for now to test API end points...
  const body = {
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_AUDIENCE,
    grant_type: 'client_credentials',
  };

  // fetch the access token for this API
  const response = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    },
  );
  const { access_token } = await response.json();
  token = access_token;

  // run db mirations...
  await initMigrations();
});

afterAll(() => closeDatabaseConnection());

describe('/pulse', () => {
  test('GET:200 server responds with OK status and message', () => {
    return request(app)
      .get('/pulse')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }) => expect(body).toEqual({ pulse: 'ok' }));
  });
});

describe('/poll', () => {
  test('GET:200 responds with array of poll data', () => {
    return request(app)
      .get('/poll')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }) => {
        const { polls } = body;
        polls.forEach((poll) => expect(poll.id).toEqual(expect.any(Number)));
      });
  });
});
