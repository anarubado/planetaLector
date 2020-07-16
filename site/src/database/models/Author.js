module.exports = (sequelize, dataTypes) => {
    let alias = 'Authors';
    let cols = {
    name: {
        type: dataTypes.STRING
    },
    lastName: {
        type: dataTypes.STRING
    },
    bioAuthorId: {
        type: dataTypes.INTEGER
    },
    image: {
        type: dataTypes.STRING
    }
    };
    let config = {
        tableName: 'authors',
        timestamps: false
    }
    const Author = sequelize.define(alias, cols, config)
    Author.associate = function(models){
        Author.hasMany(models.Product,{
            as: "products",
            foreignKey: "author_id"
        })
        Author.belongsTo(models.BioAuthor,{
            as: "bioAuthors",
            foreignKey: "bioAuthor_id"
        })
    }
    
    return Author
}