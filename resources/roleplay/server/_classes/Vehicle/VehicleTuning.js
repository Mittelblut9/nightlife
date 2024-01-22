import VehicleTuningModel from '~server/_db/models/vehicle_tuning.model.js';
import VehicleTuningUtility from './Utility/VehicleTuning.utility.js';

export default class VehTuning extends VehicleTuningUtility {
    /**
     * Get a Vehicle by vid
     * @param {Int} vid 
     * @returns {VehicleTuningModel | null}
     */
    async getByVid(vid) {
        return await VehicleTuningModel.findOne({ where: { vid } });
    }

    /**
     * Updates the VehicleTuningModel with the given data for the vehicle with the specified vid.
     * @async
     * @param {number} vid - The id of the vehicle to update.
     * @param {Object} data - The data to update the vehicle with.
     * @returns {Promise} A promise that resolves to the number of affected rows.
     */
    async updateByVid(vid, data) {
        return await VehicleTuningModel.update(data, {where: { vid }});
    }

    /**
     * Delete a Vehicle by vid
     * @param {Int} vid 
     * @returns {Int} 0 = no Vehicle found, 1 = success
     */
    async delete(vid) {
        return await VehicleTuningModel.destroy({ where: { vid } });
    }
}
