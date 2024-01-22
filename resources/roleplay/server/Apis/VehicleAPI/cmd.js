import VehicleAPI from '~server/Apis/VehicleAPI/index.js';
import * as chat from 'alt:chat';
import * as meta from '~shared/meta.js';
import VehTuning from '~server/_classes/Vehicle/VehicleTuning.js';

const vehicleClass = new VehicleAPI();
const VehicleTuningClass = new VehTuning();

/**
     * Diese Funktion Spawnt ein Fahrzeug
     * @param {alt.player} player 
     * @param {alt.vehicle.model} vehicleModel | 
     * @param {int} primR | In range of 0-255
     * @param {int} primG | In range of 0-255
     * @param {int} primB | In range of 0-255
     * @param {int} secR | In range of 0-255
     * @param {int} secG | In range of 0-255
     * @param {int} secB | In range of 0-255
     * @param {string} plate 
     * @returns 
     */
chat.registerCmd('veh', (player, args) =>{
    const veh = {
        model: args[0],
        primR: args[1] || 0,
        primG: args[2] || 0,
        primB: args[3] || 0,
        secR: args[4] || 0,
        secG: args[5] || 0,
        secB: args[6] || 0,
        plate: args[7] || 'Admin'
    };
    const primary = {
        r: veh.primR,
        g: veh.primG,
        b: veh.primB
    };
    const secondary = {
        r: veh.secR,
        g: veh.secG,
        b: veh.secB
    };
    vehicleClass.spawn(player, veh.model, primary, secondary, veh.plate);
});

chat.registerCmd('repair', (player) =>{
    if(!player.vehicle) return chat.send(player, global.text.trans(['error.vehicleapi.notFound']));
    vehicleClass.repair(player.vehicle);
});

chat.registerCmd('color', (player, args) =>{
    const primary = {
        r: args[0],
        g: args[1],
        b: args[2],
        a: args[3]
    };
    const secondary = {
        r: args[4],
        g: args[5],
        b: args[6],
        a: args[7]
    };
    if(!player.vehicle) return chat.send(player, global.text.trans(['error.vehicleapi.notFound']));
    VehicleTuningClass.color(player.vehicle, primary, secondary);
});

chat.registerCmd('neon', (player, args) =>{
    const position = {
        front: args[0],
        back: args[1],
        left: args[2],
        right: args[3]
    };
    const rgba = {
        r: args[4],
        g: args[5],
        b: args[6],
        a: args[7]
    };
    if(!player.vehicle) return chat.send(player, global.text.trans(['error.vehicleapi.notFound']));
    VehicleTuningClass.neon(player.vehicle, position, rgba);
});

chat.registerCmd('destroy', (player) =>{
    if(!player.vehicle) return chat.send(player, global.text.trans(['error.vehicleapi.notFound']));
    vehicleClass.destroy(player.vehicle);
});

chat.registerCmd('plate', (player, args) =>{
    const veh = {
        plateText: args[0],
        plateStyle: args[1]
    };
    if(!player.vehicle) return chat.send(player, global.text.trans(['error.vehicleapi.notFound']));
    vehicleClass.licensplate(player.vehicle, veh.plateText, veh.plateStyle);
});


chat.registerCmd('delete', (player) =>{
    if(!player.vehicle) return chat.send(player, global.text.trans(['error.vehicleapi.notFound']));
    vehicleClass.delete(player.vehicle.getMeta(meta.VID));
});
//TODO Clean Command