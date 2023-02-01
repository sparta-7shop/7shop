('use strict');
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        static associate(models) {
            models.Products.hasMany(models.Carts, {
                foreignKey: { name: 'product_id', allowNull: false },
                sourceKey: 'id',
            });
            models.Products.belongsTo(models.Categories, {
                foreignKey: { name: 'category_Id', allowNull: false },
                targetKey: 'id',
            });
            models.Products.belongsTo(models.Admin, {
                foreignKey: { name: 'admin_id', allowNull: false },
                sourceKey: 'id',
            });
            models.Products.hasMany(models.OrdersProducts, {
                foreignKey: { name: 'product_id', allowNull: false },
                sourceKey: 'id',
            });
        }
    }

    Products.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            img_path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Products',
            timestamps: true
        }
    );
    return Products;
};
