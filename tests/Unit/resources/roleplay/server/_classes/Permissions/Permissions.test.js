import Permissions from '~server/_classes/Permissions/Permissons';

const permissionsClass = new Permissions();

describe('Permissions class', () => {
    it('should update a role permission', async () => {
        const response = await permissionsClass.update(9, ['test']);
        expect(response[0]).toBe(1);
    });

    it('should check if a user has a permission and return false', async () => {
        const response = await permissionsClass.has(9, ['root']);
        expect(response).toBe(false);
    });

    it('should check if a user has a permission and return true', async () => {
        const response = await permissionsClass.has(10, ['root']);
        expect(response).toBe(true);
    });
});