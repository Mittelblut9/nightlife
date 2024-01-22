import { DataTypes, Model } from 'sequelize';
import database from '../index.js';

export default class PlayerDataModel extends Model {}

PlayerDataModel.init(
    {
        password: {
            type: DataTypes.STRING,
        },
        salt: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize: database,
        tableName: 'player_data',
        timestamps: false,
    }
);