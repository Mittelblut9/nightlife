import { DataTypes, Model } from 'sequelize';
import database from '../index.js';

export default class BankValueModel extends Model {}

BankValueModel.init(
    {
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize: database,
        tableName: 'bank_values',
        timestamps: false,
    }
);