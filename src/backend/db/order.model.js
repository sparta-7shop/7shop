('use strict');
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        static associate(models) {
            models.Orders.belongsTo(models.Users, {
                foreignKey: { name: 'user_id', allowNull: false },
                targetKey: 'id',
            });
            models.Orders.hasMany(models.OrdersProducts, {
                foreignKey: { name: 'order_id', allowNull: false },
                sourceKey: 'id',
            });
            models.Orders.belongsTo(models.Payments, {
                foreignKey: { name: 'payment_id', allowNull: false },
                targetKey: 'id',
            })
        }
    }

    Orders.init(
        {
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            },

        },
        {
            sequelize,
            modelName: 'Orders',
            timestamps: true
        }
    );
    return Orders;
};
