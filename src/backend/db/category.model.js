('use strict');
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        static associate(models) {
            models.Categories.hasOne(models.Products, {
                foreignKey: { name: 'category_Id', allowNull: false },
                targetKey: 'id',
            });
        }
    }

    Categories.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
        },
        {
            sequelize,
            modelName: 'Categories',
            timestamps: true
        }
    );
    return Categories;
};
