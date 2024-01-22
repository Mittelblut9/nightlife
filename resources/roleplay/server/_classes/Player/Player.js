import PlayerModel from '~server/_db/models/player.model.js';

export default class PlayerClass {

    /**
     * Creates a new player with the given cloud ID.
     * @async
     * @param {string} cloudId - The cloud ID of the player.
     * @returns {Promise<Object>} - A promise that resolves with the created player object.
     */
    async create(cloudId) {
        return await PlayerModel.create({ pid: cloudId });
    }

    /**
     * Get a player object by their pid.
     * @async
     * @param {number} pid - The player's pid.
     * @returns {Promise<object>} - A promise that resolves with the player object.
     */
    async getByPid(pid) {
        return await PlayerModel.findOne({ where: { pid } });
    }

    /**
     * Updates the player's information.
     * @throws {Error} Will not be implemented at any time.
     */
    async update() {
        throw new Error('Will not be implemented at any time');
    }

    /**
     * Deletes a player from the database.
     * @async
     * @param {number} pid - The player ID to delete.
     * @returns {Promise<number>} - The number of rows deleted.
     */
    async delete(pid) {
        return await PlayerModel.destroy({ where: { pid } });
    }
}
