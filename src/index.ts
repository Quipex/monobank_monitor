import * as dotenv from 'dotenv';

// We need to load .env file first
dotenv.config();

import moment from "moment";
import { launchServer } from "@server/server";

moment.locale('ru');
moment.tz.setDefault('Europe/Kiev');
launchServer();
