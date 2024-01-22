import { DataTypes, Model } from 'sequelize';
import database from '../index.js';

export default class VehicleTuningModel extends Model {}

VehicleTuningModel.init(
    {
        vid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        neon: {
            type: DataTypes.JSON,
            allowNull: true
        },
        color: {
            type: DataTypes.JSON,
            allowNull: true
        },
        license_plate_style: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize: database,
        tableName: 'vehicle_tuning',
        timestamps: false,
    }
);