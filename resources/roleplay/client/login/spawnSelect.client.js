import * as alt from 'alt-client';
import * as events from '../../shared/events.js';
import * as views from '../../shared/views.js';
import { hideBrowser, showBrowser } from '../../shared/functions/client/functions.client.js';
import * as variables from '../../shared/variables.js';

let spawnSelectWebView;
function createBrowser() {
    spawnSelectWebView = new alt.WebView(views.SPAWN_SELECT);

    spawnSelectWebView.on(events.CLIENT_SPAWN_SELECT_SELECT, (spawnPoint) => {
        spawnPoint = parseInt(spawnPoint);
        if(!variables.SPAWN_SELECT_POINTS.includes(spawnPoint)) {
            return;
        }

        alt.emitServer(events.SERVER_SPAWN_SELECT_SELECT, spawnPoint);
    });
}

alt.onServer(events.CLIENT_SPAWN_SELECT_SHOW, (lastPosition) => {
    createBrowser();
    showBrowser(spawnSelectWebView, alt);
    spawnSelectWebView.emit(events.CLIENT_SPAWN_SELECT_SHOW, lastPosition);
});

alt.onServer(events.CLIENT_SPAWN_SELECT_HIDE, () => {
    hideBrowser(spawnSelectWebView, alt);
});