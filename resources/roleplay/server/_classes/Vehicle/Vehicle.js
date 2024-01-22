import VehicleModel from '~server/_db/models/vehicles.model.js';

export default class Vehicle {

    /**
     * Creates a new vehicle with the specified data ID.
     * @param {int} data_id - The ID of the data associated with the vehicle.
     * @returns {Promise<VehicleModel>} A promise that resolves to the created vehicle object.
     */
    async create(data_id) {
        return await VehicleModel.create({data_id: data_id});
    }
    
    /**
     * Returns All Vehicles From The Database
     */
    async findAll() {
        return await VehicleModel.findAll();
    }
    /**
     * Get a Vehicle by vid
     * @param {Int} vid 
     * @returns {VehicleModel | null}
     */
    async getByVid(vid) {
        return await VehicleModel.findOne({ where: { vid } });
    }

    /**
     * Update a vehicle with the given data.
     * @async
     * @param {number} vid - The ID of the vehicle to update.
     * @param {Object} data - The data to update the vehicle with.
     * @returns {Promise} A promise that resolves with the updated vehicle data.
     */
    async update(vid, data) {
        return await VehicleModel.update(data, {where: {vid}});
    }

    /**
     * Delete a Vehicle by vid
     * @param {Int} vid 
     * @returns {Int} 0 = no Vehicle found, 1 = success
     */
    async delete(vid) {
        return await VehicleModel.destroy({ where: { vid } });
    }
}
