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

    Order.associate = function(models){
        // Asociacion con OrderItems
        Order.hasMany(models.OrderItems,{
            as: 'orderItems',
            foreignKey: 'orderId'
        })

        // Asociacion con Users
        //Order.belongsTo(models.Users,{
        //   as: 'users',
        //    foreignKey: 'userId'
        //})
        
    }   
    
    return Order;
}