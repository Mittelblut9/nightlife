import PermissionModel from '~server/_db/models/permissions.model.js';
import PermissionRoles from './PermissionRoles.js';
import errorhandler from '~server/system/errorhandler/errorhandler.js';

export default class Permissions {
    /**
     * Represents a Permissions object.
     * @constructor
     */
    constructor() {
        this.permissionsRoles = new PermissionRoles();
    }

    /**
     * Updates the permissions of a role in the database.
     * @async
     * @param {number} id - The ID of the role to update.
     * @param {string} permissions - The new permissions to assign to the role.
     * @returns {Promise<number>} - The number of rows affected by the update operation.
     */
    async update(id, permissions) {
        return await PermissionModel.update({
            permission: permissions
        }, {
            where: {
                role_id: id
            }
        });
    }

    /**
     * Checks if a user has a specific permission.
     * @async
     * @param {string} id - The user ID to check permissions for.
     * @param {Array} requestedPermission - The permission(s) to check for.
     * @returns {Promise<boolean>} - Resolves to a boolean indicating whether the user has the requested permission(s).
     */
    async has(id, requestedPermission) {
        const role = await this.permissionsRoles.get(id).catch(() => null);
        if (!role) return false;

        try {
            const { permission } = await role.getRolePermissions();
            const isRoot = permission.includes('root');
            console.info(`
                [Permissions] Someone requested permissions and is root. 
                If this is not you, please contact the server developers.
            `);
            if (isRoot) return true;

            return permission.some(permission => requestedPermission.includes(permission.permission));
        }catch(e) {
            errorhandler(e, 1700427564639);
            return false;
        }
    }
}