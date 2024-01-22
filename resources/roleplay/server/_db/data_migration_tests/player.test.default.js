import { PlayerTestObject } from '~shared/test/Player.test.js';
import PlayerModel from '../models/player.model.js';

export const queuePosition = 1;

export const execute = async () => {
    await PlayerModel.create({
        pid: PlayerTestObject.pid,
    });
};