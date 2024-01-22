import * as alt from 'alt-client';
import * as events from '../../shared/events.js';

alt.onServer(events.CLIENT_TOGGLE_GAME_CONTROLS, (toggle) => {
    alt.toggleGameControls(toggle);
});