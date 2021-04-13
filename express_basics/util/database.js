const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("node-complete", "nodeUser", "nodeUser", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
