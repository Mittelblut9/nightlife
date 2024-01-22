import { DataTypes, Model } from 'sequelize';
import database from '../index.js';
import PermissionModel from './permissions.model.js';

export default class PermissionRolesModel extends Model {}

PermissionRolesModel.init(
    {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'role_name'
        }
    },
    {
        sequelize: database,
        tableName: 'permission_roles',
        timestamps: false,
    }
);

PermissionRolesModel.hasOne(PermissionModel, {
    foreignKey: 'role_id',
    as: 'rolePermissions',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});