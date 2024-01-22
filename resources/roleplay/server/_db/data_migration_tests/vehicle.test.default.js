import { VehicleTestObject } from '~shared/test/Vehicle.test.js';
import VehicleModel from '../models/vehicles.model.js';

export const queuePosition = 7;

export const execute = async () => {
    await VehicleModel.create({
        vid: VehicleTestObject.vid,
        data_id: VehicleTestObject.data_id,
        license_plate: VehicleTestObject.license_plate,
    });
};