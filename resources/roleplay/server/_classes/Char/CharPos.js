import CharPosModel from '~server/_db/models/char_pos.model.js';

export default class CharPos {

    /**
     * Creates a new CharPos document in the database.
     * @async
     * @param {string} cid - The ID of the character associated with the position.
     * @returns {Promise<Object>} - The newly created CharPos document.
     */
    async create(cid) {
        return await CharPosModel.create({
            cid
        });
    }

    /**
     * Updates the position and dimension of a character.
     * @async
     * @param {number} cid - The character ID.
     * @param {number} x - The new X position.
     * @param {number} y - The new Y position.
     * @param {number} z - The new Z position.
     * @param {number} d - The new dimension.
     * @returns {Promise} A Promise that resolves to the number of affected rows.
     */
    async update(cid, x, y, z, d) {
        return await CharPosModel.update({
            pos_x: x,
            pos_y: y,
            pos_z: z,
            dimension: d
        }, {
            where: {
                cid
            }
        });
    }

    /**
     * Retrieves a character's position by their cid.
     * @async
     * @param {string} cid - The character's cid.
     * @returns {Promise<Object>} - A Promise that resolves with the character's position object.
     */
    async getByCid(cid) {
        return await CharPosModel.findOne({
            where: {
                cid
            }
        });
    }
}