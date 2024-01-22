import PlayerClass from '~server/_classes/Player/Player';
import PlayerData from '~server/_classes/Player/PlayerData';
import { PlayerTestObject } from '~shared/test/Player.test';

const playerDataClass = new PlayerData();
const playerClass = new PlayerClass();

describe('PlayerData class', () => {
    it('should create a new player data', async () => {
        const player = await playerClass.getByPid(PlayerTestObject.pid);
        const response = await playerDataClass.create(player, 
            { 
                password: PlayerTestObject.password,
                salt: PlayerTestObject.salt 
            }
        );

        expect(response.pid).toBe(PlayerTestObject.pid);
        expect(response.password).toBe(PlayerTestObject.password);
        expect(response.salt).toBe(PlayerTestObject.salt);
    });

    it('should retrieve a player data by PID', async () => {
        const response = await playerDataClass.get(PlayerTestObject.pid);

        expect(response.pid).toBe(PlayerTestObject.pid);
        expect(response.password).toBe(PlayerTestObject.password);
        expect(response.salt).toBe(PlayerTestObject.salt);
    });

    it('should throw an error when trying to update a player data', async () => {
        expect(() => playerDataClass.delete()).toThrowError(Error);
    });

    it('should throw an error when trying to delete a player data', async () => {
        expect(() => playerDataClass.delete()).toThrowError(Error);
    });
});