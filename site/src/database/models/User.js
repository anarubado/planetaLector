module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: dataTypes.STRING
        },

        email: {
            type: dataTypes.STRING
        },

        image: {
            type: dataTypes.STRING
        },

        password: {
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
        tableName: 'users'
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        
    }

    

    return User;
}