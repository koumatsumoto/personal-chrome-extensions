const consoleLogger = {
  log: (...inputs: any[]) => {
    try {
      console.log(...inputs);
    } catch (e) {
      console.error('[logger] Error on logging inputs');
    }
  },
};

const alertLogger = {
  log: (...inputs: any[]) => {
    try {
      alert(JSON.stringify(inputs, null, 2));
    } catch (e) {
      alert('[logger] Error on stringifying inputs');
    }
  },
};

let logger: { log: typeof globalThis.console.log } = globalThis.console;
export const setLogger = (type: 'console' | 'alert') => {
  switch (type) {
    case 'alert': {
      return (logger = alertLogger);
    }
    case 'console': {
      return (logger = consoleLogger);
    }
  }
};

export const log = (...inputs: any[]) => logger.log(...inputs);
