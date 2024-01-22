import { DataTypes, Model } from 'sequelize';
import database from '../index.js';

export default class BankTransactionModel extends Model {}

BankTransactionModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        source_iban: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        target_iban: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: database,
        tableName: 'bank_transaction',
        timestamps: true,
    }
);