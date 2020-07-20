module.exports = (sequelize, dataTypes) => {
    let alias = 'Authors';
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING
        },

        lastName: {
            type: dataTypes.STRING
        },

        bioAuthor: {
            type: dataTypes.STRING
        },

        image: {
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
        tableName: 'authors'
    };

    const Author = sequelize.define(alias, cols, config);

    Author.associate = function(models){
        
        Author.hasMany(models.Products,{
            as: "products",
            foreignKey: "author_id"
        });
    };
    
    return Author;
}