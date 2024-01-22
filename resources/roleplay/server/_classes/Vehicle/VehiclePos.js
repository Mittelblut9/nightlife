import VehiclePosModel from '~server/_db/models/vehicle_pos.model.js';

export default class VehPos {
   
    /**
     * Updates the position, rotation, and dimension of a vehicle in the database.
     * @async
     * @param {number} vid - The ID of the vehicle to update.
     * @param {Object} pos - The new position of the vehicle.
     * @param {Object} rot - The new rotation of the vehicle.
     * @param {number} dimension - The new dimension of the vehicle.
     * @returns {Promise<number>} - The number of rows affected (should be 1).
     */
    async update(vid, pos, rot, dimension) {
        return await VehiclePosModel.update({
            pos,
            rot,
            dimension
        }, {
            where: {
                vid
            }
        });
    }

    /**
     * Get a Vehicle Position based on vid
     * @param {Int} vid 
     * @returns {Promise<VehiclePosModel> | null}
     */
    async getByVid(vid) {
        return await VehiclePosModel.findOne({
            where: {
                vid
            }
        });
    }
}