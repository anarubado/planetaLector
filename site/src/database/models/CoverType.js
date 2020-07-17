module.exports = (sequelize, dataTypes) => {
    let alias = 'CoverType';
    let cols = {
        type: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'coverTypes',
        timestamps: false
    }
    const CoverType = sequelize.define(alias, cols, config);

    CoverType.associate = function(models){
        CoverType.hasMany(models.Product,{
            as: "products",
            foreignKey: "coverType_id"
        })
    }
    return CoverType;
}