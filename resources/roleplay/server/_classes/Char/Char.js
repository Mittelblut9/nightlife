import CharModel from '~server/_db/models/char.model.js';

export default class Char {

    /**
     * Creates a new character with the given first and last name.
     * @param {string} firstname - The first name of the character.
     * @param {string} lastname - The last name of the character.
     * @returns {Promise<Object>} - A promise that resolves to the created character object.
     */
    async create(firstname, lastname) {
        return await CharModel.create({
            firstname,
            lastname
        });
    }

    /**
     * Retrieves a character object from the database by its cid.
     * @async
     * @param {number} cid - The character ID to retrieve.
     * @returns {Promise<Object>} - A Promise that resolves with the character object.
     */
    async getByCid(cid) {
        return await CharModel.findByPk(cid);
    }

    /**
     * Retrieves a character from the database by their PID.
     * @async
     * @param {number} pid - The PID of the character to retrieve.
     * @returns {Promise<Object>} - A Promise that resolves with the retrieved character object.
     */
    async getByPid(pid) {
        return await CharModel.findOne({
            where: {
                pid
            }
        });
    }

    /**
     * Updates the first and last name of a character in the database.
     * @async
     * @param {number} cid - The character ID.
     * @param {string} firstname - The new first name.
     * @param {string} lastname - The new last name.
     * @returns {Promise} - A promise that resolves to the number of affected rows.
     */
    async update(cid, firstname, lastname) {
        return await CharModel.update({
            firstname,
            lastname
        }, {
            where: {
                cid
            }
        });
    }
}