import { VehicleTestObject } from '~shared/test/Vehicle.test.js';
import VehicleTuningModel from '../models/vehicle_tuning.model.js';

export const queuePosition = 9;

export const execute = async () => {
    await VehicleTuningModel.create({
        vid: VehicleTestObject.vid,
        neon: VehicleTestObject.neon,
        color: VehicleTestObject.color,
        license_plate_style: VehicleTestObject.license_plate_style,
    });
};