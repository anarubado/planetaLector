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

        productId:{
            type: dataTypes.INTEGER
        },

        productName: {
            type: dataTypes.STRING
        },

        productAuthor: {
            type: dataTypes.STRING
        },

        productEditorial: {
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

        productIsbn: {
            type: dataTypes.STRING
        },

        subTotal: {
            type: dataTypes.INTEGER
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
        // Asociaciones con Products
        OrderItem.belongsTo(models.Products,{
            as: 'productsId',
            foreignKey: 'productId'
        })

        OrderItem.belongsTo(models.Products,{
            as: 'productsName',
            foreignKey: 'productName'
        })        

        OrderItem.belongsTo(models.Products,{
            as: 'productsAuthor',
            foreignKey: 'productAuthor' // Hay que usar include?
        })

        OrderItem.belongsTo(models.Products,{
            as: 'productsEditorial',
            foreignKey: 'productEditorial' // Hay que usar include?
        })

        OrderItem.belongsTo(models.Products,{
            as: 'productsPrice',
            foreignKey: 'productPrice'
        })

        OrderItem.belongsTo(models.Products,{
            as: 'productsImage',
            foreignKey: 'productImage'
        })

        OrderItem.belongsTo(models.Products,{
            as: 'productsIsbn',
            foreignKey: 'productIsbn'
        })

        // Asociacion con Users
        OrderItem.belongsTo(models.Users,{
            as: 'users',
            foreignKey: 'userId'
        })

        // Asociaciones con Orders
        OrderItem.belongsTo(models.Orders,{
            as: 'orders',
            foreignKey: 'orderId'
        })

    }
    
    
    return OrderItem;
}