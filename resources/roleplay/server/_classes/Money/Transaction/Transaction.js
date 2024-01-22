import { TRANSFER_TYPES } from '~shared/bank.js';
import Queue from './Queue.js';

export default class Transaction {
    /**
     * Creates a new Transaction instance.
     * @constructor
     * @param {string} fromCid - The CID of the account making the transaction.
     * @param {string} toCid - The CID of the account receiving the transaction.
     * @param {number} amount - The amount of money being transferred in the transaction.
     */
    constructor(fromCid, toCid, amount) {
        this.accountApi = new Account();
        this.queueApi = new Queue();
        
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

    /**
     * Transfer money from one account to another.
     * @async
     * @throws {Error} If there is not enough money in the source account or if either the an account is not found.
     * @returns {Promise} Returns the result of inserting the transaction to the queue.
     */
    async transfer() {
        const hasEnoughMoney = await this.hasEnoughMoney();
        if(!hasEnoughMoney) throw new Error('Not enough money'); //todo add to text.json

        const sourceAccount = await this.accountApi.get(this.from);
        const targetAccount = await this.accountApi.get(this.to);

        if(!sourceAccount || !targetAccount) throw new Error('Account not found'); //todo add to text.json

        return await this.insertToQueue(sourceAccount.iban, targetAccount.iban, this.amount);
    }

    /**
     * Checks if the account has enough balance to complete the transaction.
     * @async
     * @returns {Promise<boolean>} Returns a boolean indicating if the account has enough balance.
     */
    async hasEnoughMoney() {
        const balance = await this.accountApi.getBalance(this.cid);
        if(typeof balance === 'boolean') return false;

        return balance >= this.amount;
    }

    /**
     * Inserts a transaction to the queue.
     * @async
     * @param {string} sourceIban - The IBAN of the source account.
     * @param {string} targetIban - The IBAN of the target account.
     * @param {number} amount - The amount to transfer.
     * @returns {Promise<boolean>} - Resolves to true if the transaction was successfully inserted, false otherwise.
     */
    async insertToQueue(sourceIban, targetIban, amount) {
        try {
            await this.queueApi.insert(sourceIban, targetIban, amount, TRANSFER_TYPES.TRANSFER);
            return true;
        } catch (err) {
            return false;
        }
    }
}