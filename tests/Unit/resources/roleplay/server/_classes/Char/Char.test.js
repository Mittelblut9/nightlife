import Char from '~server/_classes/Char/Char';
import { CharTestObject } from '~shared/test/Char.test';
import { PlayerTestObject } from '~shared/test/Player.test';

const charClass = new Char();

describe('Char class', () => {
    it('should create a new character', async () => {
        const firstname = 'John';
        const lastname = 'Doe';
        const response = await charClass.create(firstname, lastname);
        expect(response.firstname).toBe(firstname);
        expect(response.lastname).toBe(lastname);
    });

    it('should retrieve a character by CID', async () => {
        const cid = CharTestObject.cid;
        const response = await charClass.getByCid(cid);
        expect(response.cid).toBe(cid);
        expect(response.firstname).toBe(CharTestObject.firstname);
        expect(response.lastname).toBe(CharTestObject.lastname);
    });

    it('should retrieve a character by PID', async () => {
        const response = await charClass.getByPid(PlayerTestObject.pid);
        expect(response.cid).toBe(CharTestObject.cid);
        expect(response.firstname).toBe(CharTestObject.firstname);
        expect(response.lastname).toBe(CharTestObject.lastname);

    });

    it('should update a character', async () => {
        const cid = CharTestObject.cid;
        const firstname = 'John';
        const lastname = 'Doe';
        const response = await charClass.update(cid, firstname, lastname);
        expect(response[0].toString()).toMatch(/^[01]$/);
    });
});