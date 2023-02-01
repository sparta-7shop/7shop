('use strict');
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
    class Carts extends Model {
        static associate(models) {
            // models.Carts.belongsTo(models.Users, {
            //     foreignKey: { name: 'user_id', allowNull: false },
            //     targetKey: 'id',
            //     allowNull: false,
            // });
            models.Carts.belongsTo(models.Products, {
                foreignKey: { name: 'product_id', allowNull: false },
                targetKey: 'id',
                allowNull: false,
            });
        }
    }

    Carts.init(
        {
            count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Carts',
            timestamps: true
        }
    );
    return Carts;
};
