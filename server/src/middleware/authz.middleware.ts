import { GetVerificationKey, expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
}) as GetVerificationKey;

export const checkJwt = jwt({
  secret,
  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});
