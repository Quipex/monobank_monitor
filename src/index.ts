import moment from 'moment';

import { launchServer } from '#server/server.js';
import logger from '#logging/logger.js';
import getPackage from '#utils/package.helper.js';

logger.info(`App version: ${getPackage().version}`);
moment.locale('ru');
moment.tz.setDefault('Europe/Kiev');
launchServer();
