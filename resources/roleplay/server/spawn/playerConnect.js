import * as alt from 'alt-server';
import * as events from '~shared/events.js';
import * as spawns from '~shared/spawns.js';
import PlayerClass from '~server/_classes/Player/Player.js';
import { isDBRunning } from '~shared/variables.js';

const playerClass = new PlayerClass();
const defaultModel = 'mp_m_freemode_01';

alt.on('playerConnect', async player => {
    if(!isDBRunning()) {
        player.kick('Yo! Warte mal. Du warst schneller als der Server. Versuche es in ein paar Minuten noch einmal.');
        return;
    }

    const playerCloudId = player.cloudID;

    if(!playerCloudId) {
        alt.log('Someone joined without a player cloud id. Alt-V is probably down.');
        player.kick('Alt-V hat derzeit einige Probleme. Bitte versuche es später noch einmal.');
        return;
    }

    spawnPlayer(player);

    alt.emitClient(player, events.CLIENT_HIDE_MAP, true);
    alt.emitClient(player, events.CLIENT_TOGGLE_GAME_CONTROLS, true);

    const isRegistered = await playerClass.getByPid(playerCloudId);
    alt.emitClient(player, events.CLIENT_LOGIN_SHOW, { isRegistered: isRegistered ? true : false });
});

/**
 * Spawns a player at the login spawn point with default model and rotation.
 * @param {alt.player} player - The player to spawn.
 */
function spawnPlayer(player) {
    player.model = defaultModel;
    player.spawn(spawns.LOGIN_SPAWN);

    player.rot = spawns.LOGIN_SPAWN_ROTATION;
    player.frozen = true;
    player.visible = false;
}
