import { DataTypes, Model } from 'sequelize';
import database from '../index.js';

export default class PlayerPermissionModel extends Model {}

PlayerPermissionModel.init(
    {
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        tableName: 'player_permission',
        timestamps: false,
    }
);