import moment from 'moment';

import { launchServer } from '#server/server.js';

moment.locale('ru');
moment.tz.setDefault('Europe/Kiev');
launchServer();
