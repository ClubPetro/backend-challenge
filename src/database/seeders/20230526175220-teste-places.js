'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('places',
    [
      {
        country_id: 1,
        place_name: 'Sao Paulo',
        meta: '2023-06-01',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        country_id: 1,
        place_name: 'Rio de Janeiro',
        meta: '2023-06-01',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('places', null, {});
  }
};
