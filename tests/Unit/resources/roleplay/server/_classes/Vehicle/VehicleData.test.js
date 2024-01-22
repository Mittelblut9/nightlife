import VehData from '~server/_classes/Vehicle/VehicleData';
import { VehicleTestObject } from '~shared/test/Vehicle.test';

const vehicleDataClass = new VehData();

describe('VehicleData class', () => {
    it('should add a new vehicle data', async () => {
        // rename model to force a new entry
        VehicleTestObject.data.model = 'test';
        const response = await vehicleDataClass.add(VehicleTestObject.data);

        expect(response.model).toBe('test');
        expect(response.data_id).toBe(VehicleTestObject.data_id);
    });

    it('should update an existing vehicle data', async () => {
        const response = await vehicleDataClass.add(VehicleTestObject.data);
        expect(response.model).toBe(VehicleTestObject.data.model);
        expect(response.data_id).toBe(VehicleTestObject.data_id);
    });

    it('should update a vehicle data by model', async () => {
        const response = await vehicleDataClass.update(VehicleTestObject.data.model, {displayName: 'test'});
        expect(response[0].toString()).toMatch(/^[01]$/);
    });

    it('should get vehicle data by custom option', async () => {
        const response = await vehicleDataClass.getByOption({displayName: 'test'});
        expect(response.displayName).toBe('test');
        expect(response.model).toBe(VehicleTestObject.data.model);
    });
});