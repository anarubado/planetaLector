module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        title: {
            type: dataTypes.STRING
        },

        subCategoryId: {
            type: dataTypes.STRING
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