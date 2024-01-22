import Account from '~server/_classes/Money/Bank/Account.js';
import { CharTestObject } from '~shared/test/Char.test.js';

const accountClass = new Account();

describe('Account class', () => {
    it('should get a bank account by cid', async () => {
        const response = await accountClass.get(CharTestObject.cid);
        expect(response.iban).toBe(CharTestObject.bank.iban);
    });

    it('should get the balance of a bank account by cid', async () => {
        const response = await accountClass.getBalance(CharTestObject.cid);
        expect(response.balance).toBe(CharTestObject.bank.balance);
        expect(response.iban).toBe(CharTestObject.bank.iban);
    });

    it('should not get the balance of a bank account by cid', async () => {
        const response = await accountClass.getBalance(2);
        expect(response).toBe(false);
    });

    it('should not update a bank account', async () => {
        expect(accountClass.update()).rejects.toThrow(Error);
    });
});