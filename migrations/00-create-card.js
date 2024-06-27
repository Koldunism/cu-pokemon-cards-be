module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('cards', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        hp: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        weakness: {
          type: Sequelize.STRING(128),
          allowNull: true,
        },
        resistance: {
          type: Sequelize.STRING(128),
          allowNull: true,
        },
        defense: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        rarity: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        expansion: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('cards');
    },
  };
  