import VehicleAPI from '~server/Apis/VehicleAPI/index.js';
const vehicleClass = new VehicleAPI();
import { createBankBlips, createFuelStationBlips } from '~server/_startup/blips/blips.js';

console.info('[Nightlife] Successfully started server.');
createBlips();
vehicleClass.loadDB();
vehicleClass.sync();

function createBlips() {
    createBankBlips();
    createFuelStationBlips();
}
