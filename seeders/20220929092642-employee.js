"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Employees",
      [
        {
          firstName: "Deepak",
          middleName: "NA",
          lastName: "Kumar",
          email: "deepak.kumar@sourcefuse.com",
          contact: 8559010326,
          address: "Mohali",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Sunny",
          middleName: "NA",
          lastName: "Tyagi",
          email: "sunny.tyagi@sourcefuse.com",
          contact: 6396786017,
          address: "GZB",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Samarpan",
          middleName: "NA",
          lastName: "Bhattacharya",
          email: "samarpan.bhattacharya@sourcefuse.com",
          contact: 9999909854,
          address: "Mohali",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
