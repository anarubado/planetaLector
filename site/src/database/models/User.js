module.exports = (sequelize, dataTypes) => {
    
    let alias = 'User';
    let cols = {

        username: {
            type: dataTypes.STRING
        },

        email: {
            type: dataTypes.STRING
        },

        image: {
            type: dataTypes.STRING
        },

        password: {
            type: dataTypes.STRING
        },

        createdAt: {
            type: dataTypes.DATE
        },

        updatedAt: {
            type: dataTypes.DATE
        }, 

        deletedAt: {
            type: dataTypes.DATE
        }
    };

    let config = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    //User.associate = function(models){

        //User.belongsTo(models.CartItem, {
        //    as: "cartItems",
        //    foreignKey: "user_id"

        //})
    //}

    return User;
}