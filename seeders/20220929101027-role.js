"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "humar resource",
          key: "hr",
          description: "imp",
          eId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Software Developer",
          key: "sde",
          description: "important",
          eId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Architect",
          key: "archi",
          description: "important",
          eId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
