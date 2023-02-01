/* eslint-disable no-unused-vars */
import { randomUUID } from 'node:crypto';
import pino from 'pino';
import logger from 'pino-http';

export default function initPinoLogger() {
  const pinoLogger = logger({
    logger: pino(),

    genReqId: function (req, res) {
      if (req.id) return req.id;
      let id = req.get('X-Request-Id');
      if (id) return id;
      id = randomUUID();
      res.header('X-Request-Id', id);
      return id;
    },

    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
    },

    wrapSerializers: true,

    customLogLevel: function (req, res, err) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn';
      } else if (res.statusCode >= 500 || err) {
        return 'error';
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        return 'silent';
      }
      return 'info';
    },

    customSuccessMessage: function (req, res) {
      if (res.statusCode === 404) {
        return 'resource not found';
      }
      return `${req.method} completed`;
    },

    customErrorMessage: function (req, res, err) {
      return 'request errored with status code: ' + res.statusCode;
    },

    customAttributeKeys: {
      req: 'request',
      res: 'response',
      err: 'error',
      responseTime: 'timeTaken',
    },

    customProps: function (req, res) {
      return {
        customProp: req.customProp,
        customProp2: res.locals.myCustomData,
      };
    },
  });

  return function (req, res, next) {
    pinoLogger(req, res);
    return next();
  };
}
