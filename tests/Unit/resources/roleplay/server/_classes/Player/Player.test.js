import PlayerClass from '~server/_classes/Player/Player';
import { PlayerTestObject } from '~shared/test/Player.test';


const playerClass = new PlayerClass();

describe('Player class', () => {
    it('should create a new player', async () => {
        const response = await playerClass.create(PlayerTestObject.cloudId);
        expect(response.pid).toBe(PlayerTestObject.cloudId);
    });

    it('should retrieve a player by PID', async () => {
        const response = await playerClass.getByPid(PlayerTestObject.cloudId);
        expect(response.pid).toBe(PlayerTestObject.cloudId);
    });

    it('should throw an error when trying to update a player', async () => {
        expect(playerClass.update()).rejects.toThrow(Error);
    });

    it('should delete a player', async () => {
        const response = await playerClass.delete(PlayerTestObject.cloudId);
        expect(response).toBe(1);
    });
});