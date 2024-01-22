import { CharTestObject } from '~shared/test/Char.test.js';
import CharModel from '../models/char.model.js';
import { PlayerTestObject } from '~shared/test/Player.test.js';

export const queuePosition = 4;

export const execute = async () => {
    CharModel.create({
        cid: CharTestObject.cid,
        firstname: CharTestObject.firstname,
        lastname: CharTestObject.lastname,
        pid: PlayerTestObject.pid
    });
};