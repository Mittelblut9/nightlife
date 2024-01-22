import * as alt from 'alt-server';
import CharPos from '~server/_classes/Char/CharPos.js';

/**
 * Retrieves the last position of a character by their character ID (cid).
 * @param {number} cid - The character ID.
 * @returns {(alt.Vector3|boolean)} Returns the last position if it exists, otherwise returns false.
 */
export async function getLastPosition(cid) {
    const char = await (new CharPos()).getByCid(cid);
    const lastPosition = new alt.Vector3(Number(char.pos_x), Number(char.pos_y), Number(char.pos_z));
    if(Number(char.pos_x) === 0 && Number(char.pos_y) === 0 && Number(char.pos_z) === 0){
        return false;
    }
    return lastPosition;
}