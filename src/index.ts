import moment from "moment";
import { launchServer } from "./server/server";

moment.locale('ru');
moment.tz.setDefault('Europe/Kiev');
launchServer();