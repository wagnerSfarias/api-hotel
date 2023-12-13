'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('users', [
      {
        id: 'ca7679a4-2e98-4fa4-889e-8ec41a109121',
        name: 'Administrador',
        email: 'adm@adm.com',
        password_hash:
          '$2b$10$qMQmRohvmHtissyAGXnfV.7i.BgSTnBUfBAMO.bELWyI/D8/LmBYm',
        admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete(
      'users',
      { email: 'adm@adm.com' },
      {},
    )
  },
}
