import { DataTypes, Model } from 'sequelize';
import database from '../index.js';
import PlayerDataModel from './player_data.model.js';
import CharModel from './char.model.js';
import PlayerPermissionModel from './player_permission.model.js';

export default class PlayerModel extends Model {}

PlayerModel.init(
    {
        pid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        sequelize: database,
        tableName: 'player',
        timestamps: false,
    }
);

PlayerModel.hasOne(PlayerDataModel, {
    foreignKey: 'pid',
    as: 'data',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

PlayerModel.hasMany(CharModel, {
    foreignKey: 'pid',
    as: 'char',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

PlayerModel.hasOne(PlayerPermissionModel, {
    foreignKey: 'pid',
    as: 'permission',
    onDelete: 'CASCADE',
});