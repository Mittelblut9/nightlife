import { DataTypes, Model } from 'sequelize';
import database from '../index.js';

export default class VehicleDataModel extends Model {}
/*

    data_id	model	model_hash	max_speed	price	type	buyable
    Primary Key (int)	string	string	int	float	string	bool

    */
VehicleDataModel.init(
    {
        data_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: true
        },
        maxSpeed: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        maxBraking: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        maxTraction: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        maxKnots: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        vehicleClass: {
            type: DataTypes.STRING,
            allowNull: true
        },
        buyable: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    },
    {
        sequelize: database,
        tableName: 'vehicle_data',
        timestamps: true,
    }
);

