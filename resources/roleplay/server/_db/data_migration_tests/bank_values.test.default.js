import { CharTestObject } from '~shared/test/Char.test.js';
import BankValueModel from '../models/bank_value.model.js';

export const queuePosition = 12;

export const execute = async () => {
    BankValueModel.create({
        cid: CharTestObject.cid,
        iban: CharTestObject.bank.iban,
        balance: CharTestObject.bank.balance
    });
};