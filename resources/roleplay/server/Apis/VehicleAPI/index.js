import * as alt from 'alt-server';
import * as chat from 'alt:chat';
import * as meta from '~shared/meta.js';
import Vehicle from '~server/_classes/Vehicle/Vehicle.js';
import VehTuning from '~server/_classes/Vehicle/VehicleTuning.js';
import vehPos from '~server/_classes/Vehicle/VehiclePos.js';
import VehData from '~server/_classes/Vehicle/VehicleData.js';
import errorhandler from '~server/system/errorhandler/errorhandler';

const VehicleClass = new Vehicle();
const VehicleTuningClass = new VehTuning();
const vehiclePosClass = new vehPos();
const vehicleDataClass = new VehData();

export default class VehicleAPI {
    constructor() {
        this.plateMaxLength = 8;
        this.syncInterval = 1000 * 2;
    }

    /**
     * Loads all vehicles from the database and spawns them in the game world.
     * @async
     * @returns {Promise<void>}
     */
    async loadDB(){
        const all = await VehicleClass.findAll();
        all.forEach(async veh => {
            const posRes = await vehiclePosClass.getByVid(veh.vid);
            const tuningRes = await VehicleTuningClass.getByVid(veh.vid);
            const { model } = await vehicleDataClass.getByOption({data_id: veh.data_id});

            const spawnedVehicle = new alt.Vehicle(model, {...posRes.pos}, {...posRes.rot});
            spawnedVehicle.setMeta(meta.VID, veh.vid);

            this.licensplate(spawnedVehicle, veh.license_plate, veh.license_plate_style);
            VehicleTuningClass.color(spawnedVehicle, tuningRes?.color?.primary, tuningRes?.color?.secondary);
            VehicleTuningClass.neon(spawnedVehicle, tuningRes?.neon?.neon, tuningRes?.neon?.neonColor);

            alt.log('Vehicle Spawned with vid = ' + veh.vid);

            await setTimeout(() => {}, 300);
        });
    }

    /**
     * Spawns a vehicle for a player with the specified model, primary and secondary colors, and license plate.
     * @async
     * @param {alt.Player} player - The player who is spawning the vehicle.
     * @param {string} vehicleModel - The model of the vehicle to spawn.
     * @param {object} primary - The primary color of the vehicle.
     * @param {int} primary.r | In range of 0-255
     * @param {int} primary.g | In range of 0-255
     * @param {int} primary.b | In range of 0-255
     * @param {object} secondary - The secondary color of the vehicle.
     * @param {int} secondary.r | In range of 0-255
     * @param {int} secondary.g | In range of 0-255
     * @param {int} secondary.b | In range of 0-255
     * @param {string} plate - The license plate of the vehicle.
     * @returns {Promise<void>}
     */
    async spawn(player, vehicleModel, primary, secondary, plate) {
        if (plate.length > this.plateMaxLength) {
            chat.send(player, global.text.trans(['error.vehicleapi.inputtolong']));
            return;
        }

        const vehicleData = await vehicleDataClass.getByOption({model: vehicleModel});
        if (!vehicleData?.data_id) {
            chat.send(player, global.text.trans(['error.vehicleapi.incorrectModel']));
            errorhandler('Vehicle model doesn\'t exists', 1700427894625);
        }

        const newVehicle = await VehicleClass.create(vehicleData.data_id);
        const vid = newVehicle.vid;

        newVehicle.createPos({ vid });
        newVehicle.createTuning({ vid });
        
        let spawnedVehicle;
        try {
            spawnedVehicle = new alt.Vehicle(vehicleModel, {...player.pos}, {...player.rot});
            if(!spawnedVehicle){
                throw new Error(null);
            }
            
        } catch (err) {
            chat.send(player, global.text.trans(['error.vehicleapi.incorrectModel']));
            errorhandler('Vehicle model doesn\'t exists', 1700427894625);
            return;
        }
        
        spawnedVehicle.setMeta(meta.VID, vid);
        VehicleTuningClass.color(spawnedVehicle, primary, secondary);
        VehicleTuningClass.neon(spawnedVehicle, false, {r: 0, g: 0, b: 0, a: 0});
        this.licensplate(spawnedVehicle, plate);

        alt.emitClient(player, 'warpIntoVehicle', spawnedVehicle);
        alt.log('Vehicle Spawned with vid = ' + vid);
    }

    /**
     * Repairs the vehicle
     * @param {alt.Vehicle} vehicle 
     */
    repair(vehicle){
        vehicle.repair;
    }

    /**
     * This Function exists to sync Every Vehicles Position
     */
    async sync() {
        alt.setInterval(() =>{
            const all = alt.Vehicle.all;
            all.forEach(Vehicle => {
                if ([Vehicle.pos.x, Vehicle.pos.y, Vehicle.pos.z].some(isNaN)) {
                    return;
                }
                                
                const vid = Vehicle.getMeta(meta.VID);
                vehiclePosClass.update(vid, Vehicle.pos, Vehicle.rot, Vehicle.dimension);
            });
        }, this.syncInterval); 
    }

    /**
     * Diese Funktion Löscht das Fahrzeug aus der Datenbank
     * @param {int} vid 
     */
    async delete(vid) {
        const veh = await this.getSpawnedVehicleByVid(vid);
        if (veh) {
            this.destroy(veh);
        }

        return await VehicleClass.delete(vid);
    }

    /**
     * 
     * @param {alt.vehicle} vehicle 
     * @param {string} plate 
     * @param {int} plateStyle | 0 - 5
     * @returns {void}
     */
    licensplate(vehicle, plate, style = 0) {
        const vid = vehicle.getMeta(meta.VID);
        if (style.len > this.plateStyleMaxLength) {
            return false;
        }
        vehicle.numberPlateText = plate;
        vehicle.numberPlateIndex  = style;

        VehicleClass.update(vid, {license_plate: plate});
        VehicleTuningClass.updateByVid(vid, {license_plate_style: style});
    }

    /**
     * This Function Destroys the Vehilce from The Game World
     * @param {alt.vehicle} vehicle 
     */
    destroy(vehicle, putIntoGarage = false) {
        vehicle.destroy();
        
        if (putIntoGarage) {
            //TODO Waiting on GarageAPI
        }
    }
    
    /**
     * Returns the spawned vehicle object with the given VID.
     * @param {number} vid - The VID of the vehicle to retrieve.
     * @returns {alt.Vehicle|null} - The spawned vehicle object with the given VID, or null if not found.
     */
    async getSpawnedVehicleByVid(vid) {
        const all = alt.Vehicle.all;
        return await all.forEach(vehicle => {
            if (vehicle.getMeta(meta.VID) === vid) return vehicle;
        });
    }
}
