import { VehicleTestObject } from '~shared/test/Vehicle.test.js';
import VehiclePosModel from '../models/vehicle_pos.model.js';

export const queuePosition = 8;

export const execute = async () => {
    await VehiclePosModel.create({
        vid: VehicleTestObject.vid,
        pos: VehicleTestObject.pos,
        rot: VehicleTestObject.rot,
    });
};