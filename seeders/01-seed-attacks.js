module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('attacks', [
        {
          cardId: 1,
          name: 'Meal Time',
          power: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cardId: 1,
          name: 'Gnaw',
          power: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cardId: 2,
          name: 'Stoke',
          power: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cardId: 2,
          name: 'Fire Blast',
          power: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cardId: 3,
          name: 'Slam',
          power: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cardId: 3,
          name: 'Body Slam',
          power: 40,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cardId: 4,
          name: 'Giant Wave',
          power: 160,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cardId: 5,
          name: 'Dig Claws',
          power: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cardId: 6,
          name: 'Special Bow',
          power: 60,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cardId: 7,
          name: 'Pound',
          power: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          cardId: 7,
          name: 'Shining Claws',
          power: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('attacks', null, {});
    }
  };
  