import * as Sentry from '@sentry/node';

export default function errorhandler(err, id) {
    if(process.env.NODE_ENV === 'production') {
        Sentry.addBreadcrumb({
            category: 'Error ID',
            message: id.toString(),
        });
        
        Sentry.captureException(err);
        return;
    }

    console.error(err, id);
}
