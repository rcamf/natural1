import { expressjwt as jwt } from "express-jwt";
import { Request } from 'express';
import configObject from '../../config';


const getTokenFromHeader = (req: Request) => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const isAuth = jwt({
  secret: configObject.setup.jwtSecret, // The _secret_ to sign the JWTs
  getToken: getTokenFromHeader,
  algorithms: ['HS256']// How to extract the JWT from the request,
});

export default isAuth;