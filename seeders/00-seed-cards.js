module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('cards', [
        {
          name: 'Pikachu',
          type: 'Electric',
          hp: 60,
          rarity: 'Common',
          expansion: 'Gen 1',
          weakness: 'Fighting',
          resistance: 'Steel',
          defense: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Charizard',
          type: 'Fire',
          hp: 180,
          rarity: 'Rare',
          expansion: 'Gen 1',
          weakness: 'Water',
          resistance: null,
          defense: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Onix',
          type: 'Fighting',
          hp: 90,
          rarity: 'Common',
          expansion: 'Gen 1',
          weakness: 'Grass',
          resistance: null,
          defense: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Feraligatr',
          type: 'Water',
          hp: 180,
          rarity: 'Rare',
          expansion: 'Gen 2',
          weakness: 'electric',
          resistance: null,
          defense: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sneasel',
          type: 'Dark',
          hp: 70,
          rarity: 'Common',
          expansion: 'Gen 2',
          weakness: 'Grass',
          resistance: null,
          defense: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Scizor',
          type: 'Steel',
          hp: 120,
          rarity: 'Rare',
          expansion: 'Gen 4',
          weakness: 'Fire',
          resistance: 'Psychic',
          defense: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Treecko',
          type: 'Psychic',
          hp: 40,
          rarity: 'Common',
          expansion: 'Gen 3',
          weakness: 'Fire',
          resistance: 'Water',
          defense: 30,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('cards', null, {});
    }
  };
  