"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsTo(models.Employee, {
        foreignKey: "employeeId",
        onDelete: "CASCADE",
      });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      website: DataTypes.STRING,
      address: DataTypes.STRING,
      employeeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
