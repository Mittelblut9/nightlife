import { DataTypes, Model } from 'sequelize';
import database from '../index.js';
import VehicleDataModel from './vehicle_data.model.js';
import VehicleTuningModel from './vehicle_tuning.model.js';
import VehiclePosModel from './vehicle_pos.model.js';

export default class VehicleModel extends Model {}

VehicleModel.init(
    {
        vid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        data_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        license_plate: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize: database,
        tableName: 'vehicle',
        timestamps: true,
    }
);
VehicleModel.belongsTo(VehicleDataModel,{
    foreignKey: 'data_id',
    targetKey: 'data_id',
    as: 'data',
});

VehicleModel.hasOne(VehicleTuningModel, {
    foreignKey: 'vid',
    as: 'tuning',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

VehicleModel.hasOne(VehiclePosModel, {
    foreignKey: 'vid',
    as: 'pos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
