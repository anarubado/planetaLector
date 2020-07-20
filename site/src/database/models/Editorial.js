module.exports = (sequelize, dataTypes) => {
    let alias = 'Editorials';
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        
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
        tableName: 'editorials'
    }
    const Editorial = sequelize.define(alias, cols, config)
    Editorial.associate = function(models){
        
        Editorial.hasMany(models.Products,{
            as: "products",
            foreignKey: "editorial_id"
        })
    }
    return Editorial;
}