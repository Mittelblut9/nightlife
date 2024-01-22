import PlayerDataModel from '~server/_db/models/player_data.model.js';
import bcrypt from 'bcryptjs';
// eslint-disable-next-line no-unused-vars
import PlayerClass from './Player.js';

export default class PlayerData {
    constructor() {
        this.saltRounds = 10;
    }

    /**
     * Generates a salt using bcrypt with the specified number of rounds.
     * @returns {string} The generated salt.
     */
    generateSalt() {
        return bcrypt.genSaltSync(this.saltRounds);
    }

    /**
     * Hashes a password using bcrypt and a salt.
     * @param {string} password - The password to hash.
     * @param {string} salt - The salt to use for hashing.
     * @returns {string} The hashed password.
     */
    hashPassword(password, salt) {
        return bcrypt.hashSync(password, salt);
    } 

    /**
     * Creates a new player data object.
     * @param {PlayerClass} player - The player object.
     * @param {Object} data - The data to be added to the player data object.
     * @returns {Promise<Object>} - The newly created player data object.
     */
    async create(player, data) {
        return await player.createData({...data});
    }

    /**
     * Retrieves player data from the database based on the provided player ID.
     * @async
     * @param {number} pid - The player ID to search for.
     * @returns {Promise<object>} - A Promise that resolves with the player data object if found, or null if not found.
     */
    async get(pid) {
        return await PlayerDataModel.findOne({ where: { pid } });
    }

    /**
     * Update the player data.
     * @throws {Error} Will not be implemented at any time.
     */
    update() {
        throw new Error('Will not be implemented at any time');
    }

    /**
     * Deletes the player data.
     * @throws {Error} Will not be implemented at any time.
     */
    delete() {
        throw new Error('Will not be implemented at any time');
    }
}