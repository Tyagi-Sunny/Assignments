"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Customers",
      [
        {
          name: "google",
          website: "google.com",
          address: "usa",
          employeeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "fb",
          website: "fb.com",
          address: "usa",
          employeeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "apple",
          website: "apple.com",
          address: "usa",
          employeeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Customers", null, {});
  },
};
