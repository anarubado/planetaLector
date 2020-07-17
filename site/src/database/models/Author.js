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