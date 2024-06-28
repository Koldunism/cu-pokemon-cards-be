module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('users', [
        {
          cardId: 1,
          username: 'tester',
          passwordHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('users', null, {});
    }
  };
  