module.exports = (sequelize, dataTypes) => {

    let alias = 'FormatType';

    let cols = {
        
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
        tableName: 'formatTypes',
        timestamps: false
    };

    const FormatType = sequelize.define(alias, cols, config);

    FormatType.associate = function(models){
        FormatType.hasMany(models.Product,{
            as: "products",
            foreignKey: "formatType_id"
        });
    }
    return FormatType;
}