module.exports = (sequelize, dataTypes) => {

    let alias = 'FormatTypes';

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
        tableName: 'formatTypes'
    };

    const FormatType = sequelize.define(alias, cols, config);

    FormatType.associate = function(models){
        
        FormatType.hasMany(models.Products,{
            as: "products",
            foreignKey: "formatTypeId"
        });
    }
    return FormatType;
}