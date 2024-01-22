// eslint-disable-next-line no-unused-vars
import { WebView } from 'alt-client';


/**
 * Hides the specified browser and shows the game cursor.
 * @param {WebView} browser - The browser to hide.
 * @param {Alt} alt - The alt:V client object.
 */
export function hideBrowser(browser, alt) {
    browser.unfocus();
    browser.destroy();
    alt.showCursor(false);
    alt.toggleGameControls(false);
}

/**
 * Shows the specified browser and performs additional actions.
 *
 * @param {WebView} browser - The browser to show.
 * @param {Alt} alt - The alternative text to display if the browser cannot be shown.
 * @param {object} options - The additional options to perform.
 * @param {boolean} options.showCursor - Whether to show the cursor or not. Default is true.
 * @param {boolean} options.toggleGameControls - Whether to toggle game controls or not. Default is false.
 */
export function showBrowser(browser, alt, options = {
    showCursor: true,
    toggleGameControls: false
}) {
    browser.focus();
    alt.showCursor(options.showCursor);
    alt.toggleGameControls(options.toggleGameControls);
}