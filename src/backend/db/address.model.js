'use strict';
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        static associate(models) {
            models.Address.belongsTo(models.Users, {
                foreignKey: { name: 'user_id', allowNull: false },
                targetKey: 'id',
                allowNull: false,
            });
        }
    }

    Address.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

        },
        {
            sequelize,
            modelName: 'Address',
            timestamps: true
        }
    );
    return Address;
};
