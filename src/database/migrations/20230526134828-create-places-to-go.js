'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('places_to_go', {
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field:  'country_id',
        primaryKey: true,
        references: {
          model: 'countries',
          key: 'id'
        },
      },
      placeName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'place_name',
        primaryKey: true,
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
    ;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('places_to_go');
  }
};
