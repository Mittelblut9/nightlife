import errorhandler from './errorhandler.js';

process.on('unhandledRejection', async (err) => {
    errorhandler(err, 1700421967607);
});

process.on('uncaughtException', async (err) => {
    errorhandler(err, 1700421972602);
});