module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories';
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },

        title: {
            
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
        tableName: 'categories'
    }
    const Category = sequelize.define(alias, cols, config)
    Category.associate = function(models) {

        Category.hasMany(models.Products,{
            as: "products",
            foreignKey: "categoryId"
        })

        Category.hasMany(models.SubCategories,{
            as: "subCategories",
            foreignKey: "categoryId"
        })
    }
    
    return Category;
}