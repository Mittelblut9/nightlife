import * as alt from 'alt';
import * as native from 'natives';

import('./ipls/index.js');
import('./login/index.js');
import('./utils/index.js');
import('./hud/speedometer/index.js');

//Need to be moved to different file
alt.onServer('warpIntoVehicle', (veh) => {
    alt.setTimeout(() => {
        native.setPedIntoVehicle(alt.Player.local.scriptID, veh.scriptID, -1);
    }, 200);
});