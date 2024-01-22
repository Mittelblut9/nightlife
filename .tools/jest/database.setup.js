import database from '../../resources/roleplay/server/_db/index.js';

(async() => {
    await database.init();
})();