module.exports = (sequelize, dataTypes) => {
    let alias = 'Author';
    let cols = {

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
        tableName: 'authors',
        timestamps: false
    };

    const Author = sequelize.define(alias, cols, config);

    Author.associate = function(models){
        
        Author.hasMany(models.Product,{
            as: "products",
            foreignKey: "author_id"
        });
    };
    
    return Author;
}