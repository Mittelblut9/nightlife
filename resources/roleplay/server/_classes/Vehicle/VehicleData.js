import VehicleDataModel from '~server/_db/models/vehicle_data.model.js';

export default class VehData {

    /**
     * Adds vehicle data to the database or updates it if it already exists.
     * @async
     * @param {Object} data - The data to be added to the database.
     * @returns {Promise<VehicleDataModel>} - A promise that resolves with the added data.
     */
    async add(data){
        return VehicleDataModel
            .findOne({ where: {model: data.model}})
            .then(function(obj) {
                //todo update this to use the update method
                return obj ? obj.update(data.model, data) : VehicleDataModel.create({...data});
            });
    }

    /**
     * Updates the data for a vehicle model in the database.
     * @async
     * @param {string} model - The model of the vehicle to update.
     * @param {Object} data - The updated data for the vehicle.
     * @returns {Promise<VehicleDataModel>} A promise that resolves with the updated vehicle data.
     */
    async update(model, data) {
        return VehicleDataModel.update(data, {where: {model}});
    }

    /**
     * Retrieves vehicle data from the database based on the provided options.
     * @async
     * @param {Object} where - The options to filter the vehicle data by.
     * @returns {Promise<VehicleDataModel>} - A promise that resolves with the retrieved vehicle data.
     */
    async getByOption(where){
        return await VehicleDataModel.findOne({ where });
    }
}

