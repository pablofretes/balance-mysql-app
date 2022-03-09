const { DataTypes, Model, Sequelize } = require('sequelize');

class BalanceModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   */

  static setup(sequelizeInstance) {
    BalanceModel.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      total: DataTypes.INTEGER,
      fk_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
    }, {
      sequelize: sequelizeInstance,
      modelName: 'Balance',
      tableName: 'balanceTable',
      underscored: true
    });

    return BalanceModel;
  }
};

module.exports = BalanceModel;