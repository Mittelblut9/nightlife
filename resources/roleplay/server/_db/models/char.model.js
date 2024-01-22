import { DataTypes, Model } from 'sequelize';
import database from '../index.js';
import CharPosModel from './char_pos.model.js';
import BankAccountModel from './bank_account.model.js';

export default class CharModel extends Model {}

CharModel.init(
    {
        cid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        tableName: 'char',
        timestamps: true,
    }
);

CharModel.hasOne(CharPosModel, {
    foreignKey: 'cid',
    as: 'pos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

CharModel.hasMany(BankAccountModel, {
    foreignKey: 'cid',
    as: 'bankAccounts',
    onUpdate: 'CASCADE',
});