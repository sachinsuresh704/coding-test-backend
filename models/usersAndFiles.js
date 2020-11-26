const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const UsersAndFiles = sequelize.define(
        "users_and_files",
        {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            userId: {
                field: "user_id",
                type: Sequelize.UUID,
            },
            fileName: {
                field: "file_name",
                type: Sequelize.STRING,
            },
            url: {
                field: "url",
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: true,
        }
    );
    return UsersAndFiles;
};
