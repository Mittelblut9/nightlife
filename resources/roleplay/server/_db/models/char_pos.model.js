import { DataTypes, Model } from 'sequelize';
import database from '../index.js';

export default class CharPosModel extends Model {}

CharPosModel.init(
    {
        pos_x: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        pos_y: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        pos_z: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        dimension: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize: database,
        tableName: 'char_pos',
        timestamps: true,
    }
);