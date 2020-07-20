module.exports = (sequelize, dataTypes) => {
    let alias = 'SubCategories';
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },       

        title: {
            
            type: dataTypes.STRING
        },

        categoryId: {
            
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
        tableName: 'subcategories'
    }
    const SubCategory = sequelize.define(alias, cols, config)
    SubCategory.associate = function(models) {

        SubCategory.hasMany(models.Products,{
            as: "products",
            foreignKey: "subCategory_id"
        })

        SubCategory.belongsTo(models.Categories,{
            as: "categories",
            foreignKey: "category_id"
        })
    }
    
    return SubCategory;
}