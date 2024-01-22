
import axios from 'axios';
import * as chat from 'alt:chat';
import VehData from '~server/_classes/Vehicle/VehicleData.js';
import errorhandler from '~server/system/errorhandler/errorhandler';

const VehicleDataClass = new VehData();

const URL = 'https://raw.githubusercontent.com/DurtyFree/gta-v-data-dumps/master/vehicles.json';

chat.registerCmd('crawler', async (player) => {
    chat.send(player, '{FF0000} Crawler started');

    try {
        const { data } = await axios.get(URL);
    
        const parsedVehicles = [];
    
        await data.forEach((vehicle) => {
            const model = vehicle.Name;
            const displayName = vehicle.DisplayName.German;
            const hash = vehicle.Hash;
            const vehicleClass = vehicle.Class;
            const type = vehicle.Type;
            const maxBraking = vehicle.MaxBraking;
            const maxSpeed = vehicle.MaxSpeed * 3.6;
            const maxTraction = vehicle.MaxTraction;
            const maxKnots = vehicle.MaxKnots;
    
            parsedVehicles.push({
                model,
                displayName,
                hash,
                vehicleClass,
                type,
                maxBraking,
                maxSpeed,
                maxTraction,
                maxKnots
            });
        });

        
        await parsedVehicles.forEach((vehicle) => {
            VehicleDataClass.add(vehicle);
        });

        chat.send(player, '{FF0000} Crawler finished');
    } catch (e) {
        errorhandler(e, 1700427698632);
    }
    
});