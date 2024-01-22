import * as alt from 'alt-server';
import * as meta from '~shared/meta.js';
import * as events from '~shared/events.js';
import * as variables from '~shared/variables.js';
import * as spawns from '~shared/spawns.js';
import CharPos from '~server/_classes/Char/CharPos.js';
import { getLastPosition } from '~shared/functions/server/functions.server.js';

const charPosClass = new CharPos();

alt.on(events.SERVER_SPAWN_SELECT_SHOW, async (player) => {
    const lastPosition = await getLastPosition(player.getMeta(meta.CID));
    alt.emitClient(player, events.CLIENT_SPAWN_SELECT_SHOW, lastPosition);
});

alt.onClient(events.SERVER_SPAWN_SELECT_SELECT, selectSpawn);

/**
 * Selects a spawn point for the player and spawns them at that location.
 * @param {alt.player} player - The player to spawn.
 * @param {number} spawnPoint - The spawn point to use.
 */
function selectSpawn(player, spawnPoint) {
    alt.emitClient(player, events.CLIENT_SPAWN_SELECT_HIDE);
    spawnPlayer(player, spawnPoint);
}

/**
 * Spawns the player at the specified spawn point.
 * @async
 * @param {alt.player} player - The player to spawn.
 * @param {number} spawnPoint - The spawn point to use.
 * @returns {Promise<void>}
 */
async function spawnPlayer(player, spawnPoint) {
    const cid = player.getMeta(meta.CID);
    switch(spawnPoint) {
    case variables.SPAWN_SELECT_POINTS[0]: {
        player.spawn(spawns.LOGIN_DEFAULT_SPAWN);
        player.rot = spawns.LOGIN_DEFAULT_SPAWN_ROTATION;
        player.dimension = spawns.LOGIN_DEFAULT_SPAWN_DIMENSION;
        resetPlayer(player);
        break;
    }
            
    case variables.SPAWN_SELECT_POINTS[1]: {
        const char = await charPosClass.getByCid(cid);
        const lastPosition = await getLastPosition(cid);
        if(!lastPosition) {
            spawnPlayer(player, variables.SPAWN_SELECT_POINTS[0]);
            return;
        }
        player.spawn(lastPosition);
        player.dimension = char.dimension;
        resetPlayer(player);
        break;
    }
    }

    player.setMeta(meta.SYNC_ENABLED, true);
}

/**
 * Resets the player's state to default values.
 * @param {alt.player} player - The player object to reset.
 */
function resetPlayer(player) {
    player.frozen = false;
    player.visible = true;
    alt.emitClient(player, events.CLIENT_HIDE_MAP, false);
    alt.emitClient(player, events.CLIENT_TOGGLE_GAME_CONTROLS, true);
}