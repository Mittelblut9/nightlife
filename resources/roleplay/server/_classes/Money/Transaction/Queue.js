import BankTransactionQueueModel from '~server/_db/models/bank_transaction_queue.model.js';

let queueRunning = false;
let intervalTime = 500;

export default class Queue {
    /**
     * Creates an interval that calls the process method at a set interval time.
     * @returns {void}
     */
    createInterval() {
        setInterval(() => {
            this.process();
        }, intervalTime);
    }

    /**
     * Processes the transaction queue.
     * @async
     * @returns {Promise<void>}
     * @throws {Error} If there is an error while getting the queue.
     */
    async process() {
        if(queueRunning) return;
        queueRunning = true;

        const queue = await this.getAll().catch((err) => {
            throw new Error(err);
        });
        if(!queue) return;

        // eslint-disable-next-line no-unused-vars
        await queue.forEach(async (transaction) => {
            //todo https://github.com/Nightlife-AltV/nightlife/issues/118
        });

        queueRunning = false;
    }

    /**
     * Retrieves all bank transaction queue entries.
     * @async
     * @returns {Promise<Array<BankTransactionQueueModel>>} Returns the BankTransactionQueueModel instances.
     */
    async getAll() {
        return await BankTransactionQueueModel.findAll();
    }

    /**
     * Inserts a new transaction into the bank transaction queue.
     * @async
     * @param {string} source - The IBAN of the source account.
     * @param {string} target - The IBAN of the target account.
     * @param {number} amount - The amount of money to be transferred.
     * @param {string} type - The type of transaction (e.g. "deposit", "withdrawal", "transfer").
     * @returns {Promise<object>} - A Promise that resolves with the newly created transaction object.
     */
    async insert(source, target, amount, type) {
        return await BankTransactionQueueModel.create({
            source_iban: source,
            target_iban: target,
            amount: amount,
            type: type
        });
    }

    /**
     * Removes a bank transaction from the queue by its ID.
     * @async
     * @param {number} id - The ID of the bank transaction to remove.
     * @returns {Promise<number>} The number of rows deleted from the database.
     */
    async remove(id) {
        return await BankTransactionQueueModel.destroy({
            where: {
                id: id
            }
        });
    }
}