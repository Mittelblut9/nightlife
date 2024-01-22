
import Sentry from '@sentry/node';
import dotenv from 'dotenv';
dotenv.config();

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,

        release: process.env.npm_package_version,
        environment: process.env.NODE_ENV,

        tracesSampleRate: 0.8,
    });
}