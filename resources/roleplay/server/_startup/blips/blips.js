import * as alt from 'alt-server';
import * as blipConfig from '~shared/blipsConfig.js';
import { BANKS } from '~shared/locations/banks.js';
import { FUELSTATIONS } from '~shared/locations/fuelstations.js';

export function createBankBlips() {
    BANKS.forEach(pos => {
        const blip = new alt.PointBlip(pos.x, pos.y, pos.z, true);
        blip.sprite = blipConfig.BANK.sprite;
        blip.color = blipConfig.BANK.color;
        blip.name = blipConfig.BANK.name;
        blip.shortRange = true;
    });
}


export function createFuelStationBlips() {
    FUELSTATIONS.forEach(posVector => {
        const blip = new alt.PointBlip(posVector, true);
        blip.sprite = blipConfig.FUELSTATION.sprite;
        blip.color = blipConfig.FUELSTATION.color;
        blip.name = blipConfig.FUELSTATION.name;
        blip.shortRange = true;
    });
}

