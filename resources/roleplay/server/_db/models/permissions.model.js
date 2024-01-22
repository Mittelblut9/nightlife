import { DataTypes, Model } from 'sequelize';
import database from '../index.js';

export default class PermissionModel extends Model {}

PermissionModel.init(
    {
        permission: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: false,
        },
    },
    {
        sequelize: database,
        tableName: 'permission',
        timestamps: false,
    }
);

