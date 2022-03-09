const Sequelize = require('sequelize');
const UserModel = require('./models/userModel');
const BalanceModel = require('./models/balanceModel');
const MovementsModel = require('./models/movementsModel');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_NAME, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const User = UserModel.setup(sequelize);
const Balance = BalanceModel.setup(sequelize);
const Movement = MovementsModel.setup(sequelize);

sequelize.sync({ force: false })
  .then(() => {
    console.log('synced tables');
  });

module.exports = {
  User,
  Balance,
  Movement
}