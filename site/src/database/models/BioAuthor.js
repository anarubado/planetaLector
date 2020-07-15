module.exports = (sequelize, dataTypes) => {
    let alias = 'BioAuthors';
    let cols = {
    description: {
        type: dataTypes.STRING
    }
    };
    let config = {
        tableName: 'bioAuthors',
        timestamps: false
    }
    const BioAuthor = sequelize.define(alias, cols, config)
    BioAuthor.associate = function(models){
        BioAuthor.belongsTo(models.Author,{
            as: "authors",
            foreignKey: "author_id"
        })
    }
    return BioAuthor
}