import * as alt from 'alt-client';
import * as events from '../../shared/events.js';
import * as views from '../../shared/views.js';
import { hideBrowser, showBrowser } from '../../shared/functions/client/functions.client.js';

let loginWebView;
function createBrowser() {
    loginWebView = new alt.WebView(views.LOGIN);

    loginWebView.on('Client:Login:Login', (password) => {
        alt.emitServer(events.SERVER_LOGIN_LOGIN, password);
    });
    
    loginWebView.on('Client:Login:Register', (password, passwordRepeat) => {
        alt.emitServer(events.SERVER_LOGIN_REGISTER, password, passwordRepeat);
    });
}

alt.onServer(events.CLIENT_LOGIN_SHOW, (playerData) => {
    createBrowser();    
    showBrowser(loginWebView, alt);

    const { isRegistered } = playerData;
    loginWebView.emit(events.CLIENT_LOGIN_ISLOGGEDIN, isRegistered);
});

alt.onServer(events.CLIENT_LOGIN_ERROR, (error) => {
    loginWebView.emit(events.CLIENT_LOGIN_ERROR, error);
});

alt.onServer(events.CLIENT_LOGIN_HIDE, () => {
    hideBrowser(loginWebView, alt);
});