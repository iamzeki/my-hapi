'use strict';
// 表shops新增字段address
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('shops', 'address', {type: Sequelize.STRING}),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('shops', 'address'),
  ])
};
