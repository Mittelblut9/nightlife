import * as alt from 'alt-client';
import * as events from '../../shared/events.js';
import * as views from '../../shared/views.js';
import { hideBrowser, showBrowser } from '../../shared/functions/client/functions.client.js';

let moneyHudWebView;
function createBrowser() {
    moneyHudWebView = new alt.WebView(views.MONEY_HUD);
}

alt.onServer(events.CLIENT_MONEYHUD_SHOW, (money) => {
    createBrowser();
    showBrowser(moneyHudWebView, alt);
    loginWebView.emit(events.CLIENT_MONEYHUD_SHOW, money);
});

alt.onServer(events.CLIENT_MONEYHUD_HIDE, () => {
    hideBrowser(moneyHudWebView, alt);
});