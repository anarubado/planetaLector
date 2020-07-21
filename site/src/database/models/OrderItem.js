module.exports = (sequelize, dataTypes) => {
    let alias = 'OrderItems';
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },

        userId: {
            type: dataTypes.INTEGER
        },

        productName: {
            type: dataTypes.STRING
        },

        productDescription: {
            type: dataTypes.STRING
        },

        productQuantity: {
            type: dataTypes.INTEGER
        },

        productPrice: {
            type: dataTypes.INTEGER
        },

        productImage: {
            type: dataTypes.STRING
        },

        status: {
            type: dataTypes.INTEGER
        },

        orderId: {
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
        tableName: 'orderItems'
    }
    
    const OrderItem = sequelize.define(alias, cols, config);

    OrderItem.associate = function(models){
        // Asociacion con Products

        // Asociacion con Users

        // Asociacion con Orders

    }
    
    
    return OrderItem;
}