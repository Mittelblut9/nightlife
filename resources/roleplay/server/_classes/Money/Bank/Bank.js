import Transaktion from '../Transaction/Transaction.js';

export default class Bank {
    /**
     * Transfers a specified amount of money from one account to another.
     * @param {string} fromCid - The ID of the account to transfer money from.
     * @param {string} toCid - The ID of the account to transfer money to.
     * @param {number} amount - The amount of money to transfer.
     * @returns {Promise<boolean>} - A Promise that resolves to true if the transfer was successful, false otherwise.
     */
    transfer(fromCid, toCid, amount) {
        return (new Transaktion(fromCid, toCid, amount)).transfer();
    }
}