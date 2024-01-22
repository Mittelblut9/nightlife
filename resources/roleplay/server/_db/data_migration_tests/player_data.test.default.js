import { PlayerTestObject } from '~shared/test/Player.test.js';
import PlayerDataModel from '../models/player_data.model.js';

export const queuePosition = 2;

export const execute = async () => {
    PlayerDataModel.create({
        pid: PlayerTestObject.pid,
        password: PlayerTestObject.password,
        salt: PlayerTestObject.salt,
    });
};