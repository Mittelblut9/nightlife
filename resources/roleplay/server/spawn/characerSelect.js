import * as alt from 'alt-server';
import * as events from '~shared/events.js';
import * as meta from '~shared/meta.js';
import PlayerClass from '~server/_classes/Player/Player.js';
//eslint-disable-next-line no-unused-vars
import CharModel from '../_db/models/char.model.js';

const playerClass = new PlayerClass();

alt.on(events.SERVER_CHARACTER_SELECT_SHOW, async (player) => {
    const dbPlayer = await playerClass.getByPid(player.getMeta(meta.PID));
    const characters = await dbPlayer?.getChar();
    alt.emitClient(player, events.CLIENT_CHARACTER_SELECT_SHOW, transformCharData(characters));
});

alt.onClient(events.SERVER_CHARACTER_SELECT_SELECT, selectChar);

alt.on(events.SERVER_CHARACTER_SELECT_SELECT, selectChar);

//eslint-disable-next-line no-unused-vars
alt.onClient(events.SERVER_CHARACTER_SELECT_CREATE, async (player, slot) => {
    const pid = player.getMeta(meta.PID);
    const dbPlayer = await playerClass.getByPid(pid);

    const newChar = await dbPlayer.createChar({
        firstname: 'Max', //todo next tasks: let user decide the name
        lastname: 'Mustermann',
    });
    await newChar.createPos();
    alt.emit(events.SERVER_CHARACTER_SELECT_SELECT, player, newChar.cid);
});

/**
 * Transforms character data to a simplified format.
 * @param {Array} chars - An array of character objects.
 * @returns {Array} - An array of transformed character objects.
 */
function transformCharData(chars) {
    let transformedChars = [];
    chars.forEach(char => {
        transformedChars.push({
            cid: char.cid,
            firstname: char.firstname,
            lastname: char.lastname,
        });
    });
    return transformedChars;
}

/**
 * Sets the selected character ID for the player 
 * and emits events to hide the character select screen 
 * and show the spawn select screen.
 * @param {alt.player} player - The player object.
 * @param {number} cid - The ID of the selected character.
 * @returns {Promise<void>}
 */
async function selectChar(player, cid) {
    player.setMeta(meta.CID, cid);
    alt.emitClient(player, events.CLIENT_CHARACTER_SELECT_HIDE);
    alt.emit(events.SERVER_SPAWN_SELECT_SHOW, player);
}
