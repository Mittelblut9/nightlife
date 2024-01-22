import { DataTypes, Model } from 'sequelize';
import database from '../index.js';

export default class VehiclePosModel extends Model {}

VehiclePosModel.init(
    {
        vid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        pos: {
            type: DataTypes.JSON,
            allowNull: true
        },
        rot: {
            type: DataTypes.JSON,
            allowNull: true
        }
    },
    {
        sequelize: database,
        tableName: 'vehicle_pos',
        timestamps: true,
    }
);
