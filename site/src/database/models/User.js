module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {

        name: {
            type: dataTypes.STRING
        },

        lastName: {
            type: dataTypes.STRING
        },

        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);
    return User;
}