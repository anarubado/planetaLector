module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {

        name: {
            type: dataTypes.STRING
        },

        lastName: {
            type: dataTypes.STRING
        },

        email: {
            type: dataTypes.STRING
        },

        password: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){

        User.belongsTo(models.CartItem, {
            as: "cartItems",
            foreignKey: "user_id"

        })
    }

    return User;
}