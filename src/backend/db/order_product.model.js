'use strict';
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
    class OrdersProducts extends Model {
        static associate(models) {
            models.OrdersProducts.belongsTo(models.Products, {
                foreignKey: { name: 'product_id', allowNull: false },
                targetKey: 'id',
            });
            models.OrdersProducts.belongsTo(models.Orders, {
                foreignKey: { name: 'order_id', allowNull: false },
                targetKey: 'id',
            });
        }
    }

    OrdersProducts.init(
        {
            product_num: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'OrdersProducts',
            timestamps: true
        }
    );
    return OrdersProducts;
};
