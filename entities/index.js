const dbConfig = require("../db");
const {Sequelize, DataTypes, Models} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.merchandise = require('./merchandise')(sequelize, DataTypes)
db.customer = require('./customer')(sequelize, DataTypes)
db.supplier = require('./supplier')(sequelize, DataTypes)


db.merchandise.hasOne(db.customer);
db.customer.belongsTo(db.merchandise);

db.merchandise.hasOne(db.supplier);
db.supplier.belongsTo(db.merchandise);

db.DataTypes=DataTypes;
db.sequelize.sync({ force: false});
module.exports = db;