module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('attacks', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        cardId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'cards',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        name: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        power: {
          type: Sequelize.INTEGER,
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
      await queryInterface.dropTable('attacks');
    },
  };
  