module.exports = (sequelize, dataTypes) => {
    let alias = 'FormatTypes';
    let cols = {
    type: {
        type: dataTypes.STRING
    }
    };
    let config = {
        tableName: 'formatTypes',
        timestamps: false
    }
    const FormatType = sequelize.define(alias, cols, config)
    FormatType.associate = function(models){
        FormatType.hasMany(models.Products,{
            as: "products",
            foreignKey: "formatType_id"
        })
    }
    return FormatType
}