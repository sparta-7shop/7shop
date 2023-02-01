('use strict');
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            models.Users.hasMany(models.Address, {
                foreignKey: { name: 'user_id', allowNull: false },
                sourceKey: 'id',
            });
            models.Users.hasMany(models.Carts, {
                foreignKey: { name: 'user_id', allowNull: false },
                sourceKey: 'id',
            });
            models.Users.hasOne(models.Orders, {
                foreignKey: { name: 'user_id', allowNull: false },
                targetKey: 'id',
            });

        }
    }

    Users.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Users',
            timestamps: true
        }
    );
    return Users;
};
