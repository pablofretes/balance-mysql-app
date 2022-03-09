const { DataTypes, Model, Sequelize } = require('sequelize');

class MovementsModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   */

  static setup(sequelizeInstance) {
    MovementsModel.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      concept: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["positive", "negative"],
      },
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
      modelName: 'Movement',
      tableName: 'movements',
      underscored: true
    });

    return MovementsModel;
  }
};

module.exports = MovementsModel;