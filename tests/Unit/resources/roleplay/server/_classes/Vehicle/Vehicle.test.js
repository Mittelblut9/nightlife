import Vehicle from '~server/_classes/Vehicle/Vehicle';
import { VehicleTestObject } from '~shared/test/Vehicle.test';

const vehicleClass = new Vehicle();

describe('Vehicle class', () => {
    it('should delete a vehicle', async () => {
        const response = await vehicleClass.delete(VehicleTestObject.vid);
        expect(response).toBe(1);
    });

    it('should create a new vehicle', async () => {
        const response = await vehicleClass.create(VehicleTestObject.data_id);
        expect(response.data_id).toBe(1);
        expect(response.vid).toBe(2);
    });

    it('should retrieve all vehicles', async () => {
        const response = await vehicleClass.findAll();
        expect(response.length).toBe(1);
    });

    it('should retrieve a vehicle by vid', async () => {
        const response = await vehicleClass.getByVid(2);
        expect(response.vid).toBe(2);
        expect(response.data_id).toBe(VehicleTestObject.data_id);
    });

    it('should update a vehicle', async () => {
        const response = await vehicleClass.update(VehicleTestObject.vid, 
            { 
                license_plate: VehicleTestObject.license_plate 
            }
        );
        expect(response[0].toString()).toMatch(/^[01]$/);
    });
});