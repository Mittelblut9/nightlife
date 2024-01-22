/**
 * [0] - Job Center
 * [1] - Last Location
 */
export const SPAWN_SELECT_POINTS = [0, 1];

let dbIsRunning = false;
/**
 * Sets the value of the database running status.
 *
 * @param {boolean} value - The value to set for the database running status.
 */
export function setDBRunning(value) {
    dbIsRunning = value;
}

/**
 * Checks if the database is running.
 * @returns {boolean} Returns true if the database is running, false otherwise.
 */
export function isDBRunning() {
    return dbIsRunning;
}