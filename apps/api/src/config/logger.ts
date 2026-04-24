import pino from 'pino';

import { env, isDev } from '../config/env';

export const logger = pino(
  {
    level: env.LOG_LEVEL,
  },
  isDev
    ? pino.transport({
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        // Clean single-line format: timestamp level message
        messageFormat: '{msg}',
        singleLine: false,
      },
    })
    : undefined,
);
