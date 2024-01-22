export default class Iban {
    constructor() {
        this.createTries = 0;
        this.maxCreateTries = 10;
        this.maxIdLength = 4;
        this.defaultIbanStart = 'NL';

        this.validIbanRegex = new RegExp(`^${this.defaultIbanStart}[0-9]{2}[A-Z]{4}[0-9]{10}$`);
    }

    /**
     * Creates a new IBAN for the given player ID.
     * @param {number} pid - The player ID.
     * @returns {string} The new IBAN.
     */
    create(pid) {
        this.handleCreateTries(pid);

        const year = this.getCurrentYear();
        const id = this.generateRandomId();
        const newIban = `${this.defaultIbanStart}${year}-${id}`;

        if (!this.validIbanRegex.test(newIban)) {
            return this.create(pid);
        }
        
        return newIban;
    }

    /**
     * Generates a random ID for the IBAN.
     * @returns {number} A random ID.
     */
    generateRandomId() {
        return Math.floor(Math.random() * Math.pow(10, this.maxIdLength));
    }


    /**
     * Returns the current year.
     * @returns {number} The current year.
     */
    getCurrentYear() {
        return new Date().getFullYear();
    }

    /**
     * Increases the number of create tries for a given PID and throws an error if the number of tries exceeds 10.
     * @param {number} pid - The PID to increase the create tries for.
     * @throws {Error} - If the number of create tries exceeds 10.
     */
    handleCreateTries(pid) {
        this.createTries++;
        if (this.createTries > this.maxCreateTries) {
            throw new Error(`Failed to create a new IBAN on pid ${pid}.`);
        }
    }
}