module.exports = (sequelize, dataTypes) => {
    let alias = 'CoverTypes';
    let cols = {
    type: {
        type: dataTypes.STRING
    }
    };
    let config = {
        tableName: 'coverTypes',
        timestamps: false
    }
    const CoverType = sequelize.define(alias, cols, config)
    CoverType.associate = function(models){
        CoverType.hasMany(models.Products,{
            as: "products",
            foreignKey: "coverType_id"
        })
    }
    return CoverType
}