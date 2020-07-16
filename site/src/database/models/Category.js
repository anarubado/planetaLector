module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories';
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
    Category.associate = function(models){
        Category.hasMany(models.Product,{
            as: "products",
            foreignKey: "category_id"
        })
        Category.hasMany(models.SubCategory,{
            as: "subCategory",
            foreignKey: "subCategory_id"
        })
    }
    
    return Category
}