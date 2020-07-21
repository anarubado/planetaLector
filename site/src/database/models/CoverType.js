module.exports = (sequelize, dataTypes) => {
    let alias = 'CoverTypes';
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        }, 

        type: {
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
        tableName: 'coverTypes'
    }
    const CoverType = sequelize.define(alias, cols, config);

    CoverType.associate = function(models){
        
        CoverType.hasMany(models.Products,{
            as: "products",
            foreignKey: "coverTypeId"
        })
    }
    return CoverType;
}