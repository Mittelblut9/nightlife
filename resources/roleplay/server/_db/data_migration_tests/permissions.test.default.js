import * as roles from '~shared/roles.js';
import PermissionRoles from '~server/_classes/Permissions/PermissionRoles.js';
import Permissions from '~server/_classes/Permissions/Permissons.js';

const permissionClass = new Permissions();
const permissionRolesClass = new PermissionRoles();

export const queuePosition = 10;

export const execute = async () => {
    //eslint-disable-next-line no-unused-vars
    for (const [key, element] of Object.entries(roles)) {
        const permissionRole = await permissionRolesClass.create(element.id, element.name).catch(() => null);
        const roleHasPermissions = await permissionRole.getRolePermissions();
        
        if(roleHasPermissions) {
            const differentLength = roleHasPermissions.permission.length !== element.permissions.length;
            const isDifferent = roleHasPermissions.permission.some((el, i) => el !== element.permissions[i]);
            if(!isDifferent || !differentLength) continue;

            await permissionClass.update(element.id, element.permissions);

            console.info(`Permissions for role ${element.id} updated!`);
        }else {
            await permissionRole.createRolePermissions({
                permission: element.permissions
            });
            console.info(`Permissions for role ${element.id} created!`);
        }
    }
};