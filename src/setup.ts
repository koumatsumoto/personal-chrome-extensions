// Setup application environments
// Load this file before starting program

import { setLogger } from './libs/logger';

let setupCompletedOnce = false;
if (!setupCompletedOnce) {
  setLogger('console');

  setupCompletedOnce = true;
}
