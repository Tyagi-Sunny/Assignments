"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsTo(models.Employee, {
        foreignKey: "eId",
        onDelete: "CASCADE",
      });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      key: DataTypes.STRING,
      description: DataTypes.STRING,
      eId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
