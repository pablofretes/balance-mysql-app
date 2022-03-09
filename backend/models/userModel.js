const { DataTypes, Model } = require('sequelize');

class UserModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   */

  static setup(sequelizeInstance) {
    UserModel.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize: sequelizeInstance,
      modelName: 'User',
      tableName: 'users',
      underscored: true
    });

    return UserModel;
  }
};

module.exports = UserModel;