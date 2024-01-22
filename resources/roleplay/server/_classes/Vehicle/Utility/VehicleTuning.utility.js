//eslint-disable-next-line no-unused-vars
import * as alt from 'alt-server';
import * as meta from '~shared/meta.js';

export default class VehicleTuningUtility {
    constructor() {
        this.defaultColor = {primary: {b: 0, g: 0, r: 0}, secondary: {r: 0, g: 0, a: 0}};
        this.defaultNeon = {front: false, back: false, left: false, right: false};
        this.defaultNeonColor = {r: 0, g: 0, b: 0, a: 0};
    }
    /**
     * Diese Funktion setzt die Farbe des Autos
     * @param {alt.Vehicle} vehicle 
     * @param {object} primary
     * @param {int} primary.primR | In range of 0-255 
     * @param {int} primary.primG | In range of 0-255
     * @param {int} primary.primB | In range of 0-255
     * @param {object} secondary
     * @param {int} secondary.secR | In range of 0-255
     * @param {int} secondary.secG | In range of 0-255
     * @param {int} secondary.secB | In range of 0-255
     */
    async color(vehicle, primary, secondary) {
        if(!primary) primary = this.defaultColor.primary;
        if(!secondary) secondary = this.defaultColor.secondary;

        vehicle.customPrimaryColor = primary;
        vehicle.customSecondaryColor = secondary;

        const vid = vehicle.getMeta(meta.VID);
        return await this.updateByVid(vid, {
            color: {
                primary,
                secondary
            }
        });
    }

    /**
     * 
     * @param {alt.vehicle} Vehicle 
     * @param {object} position
     * @param {boolean} front toggle
     * @param {boolean} back toggle
     * @param {boolean} left toggle
     * @param {boolean} right toggle 
     * @param {object} rgba
     * @param {int} r | In range of 0-255
     * @param {int} g | In range of 0-255
     * @param {int} b | In range of 0-255
     * @param {int} a | In range of 0-255
     */
    async neon(vehicle, position, rgba){
        if(!position) position = this.defaultNeon;
        if(!rgba) rgba = this.defaultNeonColor;

        const vid = vehicle.getMeta(meta.VID);
        vehicle.neon = position;
        vehicle.neonColor = rgba;
        this.updateByVid(vid, {
            neon: vehicle.neon,
            neonColor: vehicle.neonColor
        });
    }
}