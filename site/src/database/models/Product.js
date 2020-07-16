module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
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
    }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    }
    const Product = sequelize.define(alias, cols, config)
    Product.associate = function(models){
        Product.belongsTo(models.Category,{
            as: "categories",
            foreignKey: "category_id"
        })
        Product.belongsTo(models.Author,{
            as: "authors",
            foreignKey: "author_id"
        })
        Product.belongsTo(models.Editorial,{
            as: "editorials",
            foreignKey: "editorial_id"
        })
        Product.belongsTo(models.CoverType,{
            as: "coverTypes",
            foreignKey: "coverType_id"
        })
        Product.belongsTo(models.FormatType,{
            as: "formatTypes",
            foreignKey: "formatType_id"
        })
    }
    return Product
}