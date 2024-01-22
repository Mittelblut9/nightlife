import { PlayerTestObject } from '~shared/test/Player.test.js';
import PlayerPermissionModel from '../models/player_permission.model.js';

export const queuePosition = 3;

export const execute = async () => {
    PlayerPermissionModel.create({
        role_id: PlayerTestObject.role_id,
        pid: PlayerTestObject.pid,
    });
};