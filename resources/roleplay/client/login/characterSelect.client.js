import * as alt from 'alt-client';
import * as events from '../../shared/events.js';
import * as views from '../../shared/views.js';
import { hideBrowser, showBrowser } from '../../shared/functions/client/functions.client.js';

let characterSelectWebView;
function createBrowser() {
    characterSelectWebView = new alt.WebView(views.CHARACTER_SELECT);

    characterSelectWebView.on('Client:CharacterSelect:Create', (slot) => {
        alt.emitServer(events.SERVER_CHARACTER_SELECT_CREATE, slot);
    });
    
    characterSelectWebView.on('Client:CharacterSelect:Select', (cid) => {
        alt.emitServer(events.SERVER_CHARACTER_SELECT_SELECT, cid);
    });
}

alt.onServer(events.CLIENT_CHARACTER_SELECT_SHOW, (characters) => {
    createBrowser();
    showBrowser(characterSelectWebView, alt);
    characterSelectWebView.emit(events.CLIENT_CHARACTER_SELECT_SHOW, characters);
});

alt.onServer(events.CLIENT_CHARACTER_SELECT_HIDE, () => {
    hideBrowser(characterSelectWebView, alt);
});