const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Users = sequelize.define(
        "users",
        {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            username: {
                field: "username",
                type: Sequelize.STRING,
            },
            email: {
                field: "email",
                type: Sequelize.STRING,
            },
            password: {
                field: "password",
                type: Sequelize.STRING,
            },
            picture: {
                field: "picture",
                type: Sequelize.STRING,
            },
            phone: {
                field: "phone",
                type: Sequelize.STRING,
            },
            isAdmin: {
                field: "is_admin",
                type: Sequelize.BOOLEAN,
            },
        },
        {
            timestamps: true,
        }
    );
    return Users;
};
