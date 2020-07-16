module.exports = (sequelize, dataTypes) => {
    let alias = 'CartItem';
    let cols = {
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
        }
    };

    let config = {
        tableName: 'categories'
    }
    
    const CartItem = sequelize.define(alias, cols, config);

    CartItem.associate = function(models){
        
        CartItem.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'product_id'

        }),

        CartItem.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_id'
        })
    }
    
    return CartItem;
}