module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        
        title: {
            type: dataTypes.STRING
        },

        description: {
            type: dataTypes.STRING
        },

        price: {
            type: dataTypes.INTEGER
        },

        stock: {
            type: dataTypes.INTEGER
        },

        isbn: {
            type: dataTypes.STRING
        },

        numberPages: {
            type: dataTypes.INTEGER
        },

        image: {
            type: dataTypes.INTEGER
        },

        categoryId: {
            type: dataTypes.INTEGER
        },

        subcategoryId: {
            type: dataTypes.INTEGER
        },

        authorId: {
            type: dataTypes.INTEGER
        },

        editorialId: {
            type: dataTypes.INTEGER
        },

        coverTypeId: {
            type: dataTypes.INTEGER
        },

        formatTypeId: {
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
        tableName: 'products'
    }
    const Product = sequelize.define(alias, cols, config)
    Product.associate = function(models){

        Product.belongsTo(models.Category,{
            as: "categories",
            foreignKey: "category_id"
        });

        Product.belongsTo(models.Author,{
            as: "authors",
            foreignKey: "author_id"
        });

        Product.belongsTo(models.Editorial,{
            as: "editorials",
            foreignKey: "editorial_id"
        });

        Product.belongsTo(models.CoverType,{
            as: "coverTypes",
            foreignKey: "coverType_id"
        });     // Podria o no tener tapa dura o blanda

        Product.belongsTo(models.FormatType,{
            as: "formatTypes",
            foreignKey: "formatType_id"
        });

        Product.belongsTo(models.CartItem, {
            as: "cartItems",
            foreignKey: "product_id"
        })
    }
    return Product;
}