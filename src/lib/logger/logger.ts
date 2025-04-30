/* eslint-disable @typescript-eslint/no-explicit-any */

const logLevels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLogLevel = logLevels.debug; // Set your desired log level

export const logger = {
  debug: (...args: any[]) => {
    if (currentLogLevel <= logLevels.debug) {
      console.debug('[DEBUG]', ...args);
    }
  },
  info: (...args: any[]) => {
    if (currentLogLevel <= logLevels.info) {
      console.info('[INFO]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (currentLogLevel <= logLevels.warn) {
      console.warn('[WARN]', ...args);
    }
  },
  error: (...args: any[]) => {
    if (currentLogLevel <= logLevels.error) {
      console.error('[ERROR]', ...args);
    }
  },
};