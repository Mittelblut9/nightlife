import BankAccountModel from '~server/_db/models/bank_account.model.js';

export default class Account {

    /**
     * Retrieves a bank account from the database by its cid.
     * @async
     * @param {string} cid - The cid of the bank account to retrieve.
     * @returns {Promise<Object>} - A Promise that resolves with the retrieved bank account object.
     */
    async get(cid) {
        return await BankAccountModel.findOne({
            where: {
                cid
            }
        });
    }

    /**
     * Retrieves the balance of a bank account for a given character ID.
     * @async
     * @param {number} cid - The character ID to retrieve the balance for.
     * @returns {(number|false)} The balance of the account, or false if the account does not exist or has no value.
     */
    async getBalance(cid) {
        const account = await this.get(cid);
        if (!account) return false;

        return account.getValue() || false;
    }

    async update() {
        throw new Error('Will not be implemented at any time');
    }
}