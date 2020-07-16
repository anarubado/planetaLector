module.exports = (sequelize, dataTypes) => {

    let alias = 'SubCategory';
    
    let cols = {
        title: {
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: 'subCategories',
        timestamps: false
    }
    const SubCategory = sequelize.define(alias, cols, config);

    SubCategory.associate = function(models){

        SubCategory.belongsTo(models.Category,{
            as: "category",
            foreignKey: "category_id"
        })
    }
    return SubCategory;
}