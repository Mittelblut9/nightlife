import VehPos from '~server/_classes/Vehicle/VehiclePos';
import VehiclePosModel from '~server/_db/models/vehicle_pos.model';
import { VehicleTestObject } from '~shared/test/Vehicle.test';

const vehPos = new VehPos();

describe('VehiclePos class', () => {
    it('should update a position for a vehicle', async () => {
        VehiclePosModel.create({
            vid: VehicleTestObject.vid + 1,
            pos: VehicleTestObject.pos,
            rot: VehicleTestObject.rot,
            dimension: VehicleTestObject.dimension
        });

        // rename vid to force an update
        VehicleTestObject.pos.x = 1;
        
        //eslint-disable-next-line max-len
        const response = await vehPos.update(VehicleTestObject.vid, VehicleTestObject.pos, VehicleTestObject.rot, VehicleTestObject.dimension);
        expect(response[0].toString()).toMatch(/^[01]$/);
    });

    it('should get a vehicle position by vid', async () => {
        const response = await vehPos.getByVid(VehicleTestObject.vid);
        expect(response.pos.x).toBe(VehicleTestObject.pos.x);
        expect(response.pos.y).toBe(VehicleTestObject.pos.y);
        expect(response.pos.z).toBe(VehicleTestObject.pos.z);
        expect(response.rot.x).toBe(VehicleTestObject.rot.x);
        expect(response.rot.y).toBe(VehicleTestObject.rot.y);
        expect(response.rot.z).toBe(VehicleTestObject.rot.z);
        expect(response.dimension).toBe(VehicleTestObject.dimension);
    });
});