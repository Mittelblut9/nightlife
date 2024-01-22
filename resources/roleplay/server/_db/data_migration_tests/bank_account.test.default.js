import { CharTestObject } from '~shared/test/Char.test.js';
import BankAccountModel from '../models/bank_account.model.js';

export const queuePosition = 11;

export const execute = async () => {
    BankAccountModel.create({
        cid: CharTestObject.cid,
        iban: CharTestObject.bank.iban
    });
};