import('./sentry/sentry.js');

import dotenv from 'dotenv';
import database from '~server/_db/index.js';
import Texts from '~shared/text/Texts.js';

dotenv.config();
database.init();

global.text = new Texts();
