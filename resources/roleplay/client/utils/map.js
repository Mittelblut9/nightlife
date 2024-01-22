import * as alt from 'alt-client';
import * as events from '../../shared/events.js';
import { displayRadar } from 'natives';

alt.onServer(events.CLIENT_HIDE_MAP, (hide) => {
    displayRadar(!hide);
});