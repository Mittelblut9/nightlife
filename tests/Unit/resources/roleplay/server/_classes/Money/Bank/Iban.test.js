import Iban from '~server/_classes/Money/Bank/Iban';
const ibanClass = new Iban();

describe('Generate a random ID', () => {
    it('should return a number', () => {
        const id = ibanClass.generateRandomId();
        expect(typeof id).toBe('number');
    });
});

describe('Get the current year', () => {
    it('should return a number', () => {
        const year = ibanClass.getCurrentYear();
        expect(typeof year).toBe('number');
        expect(year).toBe(new Date().getFullYear());
    });
});

describe('Handle create tries', () => {
    it('should throw an error if the number of tries exceeds the limit', () => {
        expect(() => {
            const newIban = new Iban();
            newIban.createTries = newIban.maxCreateTries;
            newIban.handleCreateTries(1);
        }).toThrow(Error);
    });

    it('should not throw an error if the number of tries does not exceed the limit', () => {
        expect(() => {
            const newIban = new Iban();
            newIban.createTries = newIban.maxCreateTries - 1;
            newIban.handleCreateTries(1);
        }).not.toThrow(Error);
    });
});