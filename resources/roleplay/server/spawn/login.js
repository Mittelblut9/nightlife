import * as alt from 'alt-server';
import * as events from '~shared/events.js';
import * as meta from '~shared/meta.js';
import * as roles from '~shared/roles.js';
import PlayerClass from '~server/_classes/Player/Player.js';
import PlayerData from '~server/_classes/Player/PlayerData.js';
import errorhandler from '~server/system/errorhandler/errorhandler';

const playerClass = new PlayerClass();
const playerDataClass = new PlayerData();

alt.onClient(events.SERVER_LOGIN_LOGIN, loginPlayer);
alt.onClient(events.SERVER_LOGIN_REGISTER, registerPlayer);

/**
 * Logs in a player with the given password.
 * @async
 * @param {alt.player} player - The player to log in.
 * @param {string} password - The password to use for authentication.
 */
async function loginPlayer(player, password) {
    const playerCloudId = player.cloudID;

    try {
        const playerData = await playerClass.getByPid(playerCloudId);
        if(!playerData) {
            alt.emitClient(player, events.CLIENT_LOGIN_ERROR, global.text.trans(['error.login.noAccountFound']));
            return;
        }

        const playerSensibleData = await playerDataClass.get(playerData.pid);
        const hashedPassword = playerDataClass.hashPassword(password, playerSensibleData.salt);

        if(hashedPassword !== playerSensibleData.password) {
            alt.emitClient(player, events.CLIENT_LOGIN_ERROR, global.text.trans(['error.login.notCorrect']));
            return;
        }

        player.setMeta(meta.PID, playerData.pid);
        alt.emitClient(player, events.CLIENT_LOGIN_HIDE);
        alt.emit(events.SERVER_CHARACTER_SELECT_SHOW, player);
    } catch(e) {
        errorhandler(e, 1700427736629);
        alt.emitClient(player, events.CLIENT_LOGIN_ERROR, global.text.trans(['error.general.unexpectedError']));
    }
}

/**
 * Registers a player with a given password and password repeat.
 * @param {alt.player} player - The player object.
 * @param {string} password - The password to register with.
 * @param {string} passwordRepeat - The repeated password to confirm registration.
 * @returns {Promise<void>}
 */
async function registerPlayer(player, password, passwordRepeat) {
    const playerCloudId = player.cloudID;

    try {
        if(password !== passwordRepeat) {
            alt.emitClient(player, events.CLIENT_LOGIN_ERROR, global.text.trans(['error.login.passwordsDontMatch']));
            return;
        }
        
        const newPlayer = await playerClass.create(playerCloudId);
        const salt = playerDataClass.generateSalt();
        const hashedPassword = playerDataClass.hashPassword(password, salt);

        await playerDataClass.create(newPlayer, {password: hashedPassword, salt});
        
        await newPlayer.createPermission({role_id: roles.DEFAULT_ROLE.id});

        alt.emitClient(player, events.CLIENT_LOGIN_HIDE);
        setTimeout(() => {
            alt.emitClient(player, events.CLIENT_LOGIN_SHOW, { isRegistered: true });
        }, 100);
    } catch(e) {
        errorhandler(e, 1700427754625);
        alt.emitClient(player, events.CLIENT_LOGIN_ERROR, global.text.trans(['error.general.unexpectedError']));
    }
}