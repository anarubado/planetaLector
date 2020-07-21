module.exports = (sequelize, dataTypes) => {
    let alias = 'Orders';
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },

        number: {
            type: dataTypes.INTEGER

        },

        total: {
            type: dataTypes.INTEGER
        },

        userId: {
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
        tableName: 'orders'
    }
    
    const Order = sequelize.define(alias, cols, config);

    
    
    return Order;
}