import CharPos from '~server/_classes/Char/CharPos';
import { CharTestObject } from '~shared/test/Char.test';

const charPosClass = new CharPos();

describe('CharPos class', () => {
    it('should create a new CharPos document in the database', async () => {
        const cid = CharTestObject.cid;
        const response = await charPosClass.create(cid);
        expect(response).toHaveProperty('pos_x');
        expect(response).toHaveProperty('pos_y');
        expect(response).toHaveProperty('pos_z');
        expect(response).toHaveProperty('dimension');
    });
});