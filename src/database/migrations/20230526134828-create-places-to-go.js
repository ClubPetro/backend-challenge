'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('places_to_go', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field:  'country_id',
        // primaryKey: true,
        references: {
          model: 'countries',
          key: 'id'
        },
      },
      placeName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'place_name',
        // primaryKey: true,
      },
      meta: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    },
    {
      timestamps: false,
    });
  
    await queryInterface.addConstraint('places_to_go', {
      fields: ['country_id', 'place_name'],
      type: 'unique',
      name: 'unique_country_place_name'
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('places_to_go');
    await queryInterface.removeConstraint('places_to_go', 'unique_country_place_name');
  }
};
