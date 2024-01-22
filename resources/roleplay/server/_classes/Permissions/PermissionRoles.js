import PermissionRolesModel from '~server/_db/models/permisions_roles.model.js';

export default class PermissionRoles {

    /**
     * Creates a new permission role with the given id and name.
     * @async
     * @param {number} id - The id of the role.
     * @param {string} name - The name of the role.
     * @returns {Promise<object>} - A Promise that resolves with the created permission role object.
     */
    async create(id, name) {
        return await PermissionRolesModel.create({
            role_id: id,
            role_name: name
        }, {
            ignoreDuplicates: true
        });
    }

    /**
     * Retrieves a permission role by its ID.
     *
     * @async
     * @param {number} id - The ID of the permission role to retrieve.
     * @returns {Promise<object>} A Promise that resolves with the permission role object.
     */
    async get(id) {
        return await PermissionRolesModel.findOne({
            where: {
                role_id: id
            }
        });
    }
}