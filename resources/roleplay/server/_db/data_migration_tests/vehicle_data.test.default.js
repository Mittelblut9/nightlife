import { VehicleTestObject } from '~shared/test/Vehicle.test.js';
import VehicleDataModel from '../models/vehicle_data.model.js';

export const queuePosition = 6;

export const execute = async () => {
    VehicleDataModel.create({
        data_id: VehicleTestObject.data_id,
        displayName: VehicleTestObject.data.displayName,
        model: VehicleTestObject.data.model,
        hash: VehicleTestObject.data.hash,
        maxSpeed: VehicleTestObject.data.maxSpeed,
        maxBraking: VehicleTestObject.data.maxBraking,
        maxTraction: VehicleTestObject.data.maxTraction,
        maxKnots: VehicleTestObject.data.maxKnots,
        price: VehicleTestObject.data.price,
        type: VehicleTestObject.data.type,
        vehicleClass: VehicleTestObject.data.vehicleClass,
        buyable: VehicleTestObject.data.buyable
    });
};