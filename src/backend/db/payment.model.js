('use strict');
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
    class Payments extends Model {
        static associate(models) {
            models.Payments.hasOne(models.Orders, {
                foreignKey: { name: 'payment_id', allowNull: false },
                targetKey: 'id',
            });
        }
    }

    Payments.init(
        {
            total_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },

        },
        {
            sequelize,
            modelName: 'Payments',
            timestamps: true,
            paranoid: true,
            deletedAt: 'destroyTime'
        }
    );
    return Payments;
};
