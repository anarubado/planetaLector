module.exports = (sequelize, dataTypes) => {
    let alias = 'CoverType';
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