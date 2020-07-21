module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        
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

        subCategoryId: {
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

        Product.belongsTo(models.Categories,{
            as: "categories",
            foreignKey: "category_id"
        });

        Product.belongsTo(models.SubCategories,{
            as: "subCategories",
            foreignKey: "subCategory_id"
        })

        Product.belongsTo(models.Authors,{
            as: "authors",
            foreignKey: "author_id"
        });

        Product.belongsTo(models.Editorials,{
            as: "editorials",
            foreignKey: "editorial_id"
        });

        Product.belongsTo(models.CoverTypes,{
            as: "coverTypes",
            foreignKey: "coverType_id"
        });     // Podria o no tener tapa dura o blanda

        Product.belongsTo(models.FormatTypes,{
            as: "formatTypes",
            foreignKey: "formatType_id"
        });
    }
    return Product;
}