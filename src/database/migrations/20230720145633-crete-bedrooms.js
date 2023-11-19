'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bedrooms', {
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
      url_banner: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_left: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_right: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      unit_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Units', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Bedrooms')
  },
}
