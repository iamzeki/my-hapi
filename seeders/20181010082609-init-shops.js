'use strict';

const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'shops',
    [
      { id: 1, name: '店铺1', thumb_url: '1.png', ...timestamps, address: '地址1' },
      { id: 2, name: '店铺2', thumb_url: '2.png', ...timestamps, address: '地址2' },
      { id: 3, name: '店铺3', thumb_url: '3.png', ...timestamps, address: '地址3' },
      { id: 4, name: '店铺4', thumb_url: '4.png', ...timestamps, address: '地址4' },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    // 删除 shop 表 id 为 1，2，3，4 的记录
    return queryInterface.bulkDelete('shops', { id: { [Op.in]: [1, 2, 3, 4] } }, {});
  },
};
