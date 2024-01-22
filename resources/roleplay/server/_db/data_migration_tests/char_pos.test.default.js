import { CharTestObject } from '~shared/test/Char.test.js';
import CharPosModel from '../models/char_pos.model.js';

export const queuePosition = 5;

export const execute = async () => {
    CharPosModel.create({
        cid: CharTestObject.cid,
        pos_x: CharTestObject.pos.x,
        pos_y: CharTestObject.pos.y,
        pos_z: CharTestObject.pos.z,
        dimension: CharTestObject.pos.dimension,
    });
};