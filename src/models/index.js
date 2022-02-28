const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  host: "localhost",
  database: "session_db",
  username: "newuser",
  password: "1234",
  dialect: "mysql",
});

exports.User = sequelize.define("users", {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

// sequelize.sync()
