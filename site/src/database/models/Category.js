module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
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
        tableName: 'categories',
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config)
    Category.associate = function(models) {
        Category.hasMany(models.Product,{
            as: "products",
            foreignKey: "category_id"
        })
        Category.hasMany(models.Category,{
            as: "sub_categories",
            foreignKey: "parent_category_id"
        })
    }
    
    return Category;
}