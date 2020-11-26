const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Connect all the models/tables in the database to a db object,
const db = {};

db.sequelize = sequelize;

db.users = require("../models/users")(sequelize);
db.usersAndFiles = require("../models/usersAndFiles")(sequelize);

db.users.hasMany(db.usersAndFiles, { foreignKey: "userId", as: "files" });

module.exports = db;
