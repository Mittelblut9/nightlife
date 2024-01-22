import PermissionRoles from '~server/_classes/Permissions/PermissionRoles';

const permissionRoleClass = new PermissionRoles();

describe('PermissionRoles class', () => {
    it('should create a permission role', async () => {
        const response = await permissionRoleClass.create(1, 'test');
        expect(response.role_id).toBe(1);
        expect(response.role_name).toBe('test');
    });

    it('should get a permission role by id', async () => {
        const response = await permissionRoleClass.get(1);
        expect(response.role_id).toBe(1);
        expect(response.role_name).toBe('test');
    });
});