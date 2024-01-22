import * as alt from 'alt-client';
import * as native from 'natives';

/**
 * 
 * @param {string} msg 
 * @param {float} x 
 * @param {float} y 
 * @param {float} scale 
 * @param {int} fontType 
 * @param {rgb} r 
 * @param {rgb} g 
 * @param {rgb} b 
 * @param {rgb} a 
 * @param {boolean} useOutline 
 * @param {boolean} useDropShadow 
 * @param {int} align 
 */
function drawText2d(msg, x, y, scale, fontType, r, g, b, a, useOutline = true, useDropShadow = true, align = 0
) {
    let hex = msg.match('{.*}');
    if (hex) {
        const rgb = hexToRgb(hex[0].replace('{', '').replace('}', ''));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        msg = msg.replace(hex[0], '');
    }
    
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);
    native.setTextJustification(align);
    
    if (useOutline) {
        native.setTextOutline();
    }
    
    if (useDropShadow) {
        native.setTextDropShadow();
    }
    
    native.endTextCommandDisplayText(x, y, 0);
}

alt.everyTick(() => {
    let vehicle = alt.Player.local.vehicle;
    if (!vehicle) return;
    //let speed = native.getEntitySpeed((vehicle.scriptID) * 3.6).toFixed(0);
    let speed = (native.getEntitySpeed(vehicle) * 3.6).toFixed(0).toString() + ' km/h';
    drawText2d(speed, 0.5, 0.05, 0.4, 4, 255, 255, 255, 255);
});