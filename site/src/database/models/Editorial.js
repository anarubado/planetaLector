module.exports = (sequelize, dataTypes) => {
    let alias = 'Editorials';
    let cols = {
    name: {
        type: dataTypes.STRING
    }
    };
    let config = {
        tableName: 'editorials',
        timestamps: false
    }
    const Editorial = sequelize.define(alias, cols, config)
    Editorial.associate = function(models){
        Editorial.hasMany(models.Products,{
            as: "products",
            foreignKey: "editorial_id"
        })
    }
    return Editorial
}