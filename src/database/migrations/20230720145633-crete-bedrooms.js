'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bedrooms', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      qtd_people: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      path: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      unit_id: {
        type: Sequelize.INTEGER,
        references: { model: 'units', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('bedrooms')
  },
}
