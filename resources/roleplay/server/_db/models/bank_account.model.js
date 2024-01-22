import { DataTypes, Model } from 'sequelize';
import database from '../index.js';
import BankValueModel from './bank_value.model.js';

export default class BankAccountModel extends Model {}

BankAccountModel.init(
    {
        iban: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        tableName: 'bank_account',
        timestamps: true,
    }
);

BankAccountModel.hasOne(BankValueModel, {
    foreignKey: 'iban',
    as: 'value',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});