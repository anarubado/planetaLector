module.exports = (sequelize, dataTypes) => {
    let alias = 'CartItems';
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },

        userId: {
            type: dataTypes.INTEGER
        },

        productId: {
            type: dataTypes.INTEGER
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
        tableName: 'cartItems'
    }
    
    const CartItem = sequelize.define(alias, cols, config);

    CartItem.associate = function(models){
        
        CartItem.belongsTo(models.Products, {
            as: 'products',
            foreignKey: 'product_id'

        }),

        CartItem.belongsTo(models.Users, {
            as: 'users',
            foreignKey: 'user_id'
        })
    }
    
    return CartItem;
}