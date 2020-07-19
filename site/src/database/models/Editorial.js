module.exports = (sequelize, dataTypes) => {
    let alias = 'Editorial';
    let cols = {
        
        name: {
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
        tableName: 'editorials',
        timestamps: false
    }
    const Editorial = sequelize.define(alias, cols, config)
    Editorial.associate = function(models){
        Editorial.hasMany(models.Product,{
            as: "products",
            foreignKey: "editorial_id"
        })
    }
    return Editorial;
}