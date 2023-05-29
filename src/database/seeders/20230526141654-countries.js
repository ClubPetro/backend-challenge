'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('countries',
    [
      {
        name: 'Brazil',
        url_image: 'https://flagcdn.com/60x45/br.png',
      },
      {
        name: 'United States',
        url_image: 'https://flagcdn.com/60x45/us.png',
      },
      {
        name: 'Italy',
        url_image: 'https://flagcdn.com/60x45/it.png',
      },
      {
        name: 'France',
        url_image: 'https://flagcdn.com/60x45/fr.png',
      },
      {
        name: 'Germany',
        url_image: 'https://flagcdn.com/60x45/de.png',
      },
      {
        name: 'Spain',
        url_image: 'https://flagcdn.com/60x45/es.png',
      },
    ],{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('countries', null, {});
  }
};
