const GROUP_NAME = 'shops';

const models = require('../models');
const {paginationDefine} = require('../utils/router-helper');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      const limit = request.query.limit;
      const {rows: results, count: totalCount} = await models.shops.findAndCountAll({
        // 一个要查询的字段列表，或者一个key为include 或 exclude 对象的键
        attributes: {
          // 查询列表排除id字段
          exclude: ['id']
        },
        limit: limit,
        offset: (request.query.page - 1) * limit,
      });
      // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
      reply({results, totalCount});
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺列表',
      validate: {
        query: {
          ...paginationDefine
        }
      }
    },
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/{shopId}/goods`,
    handler: async (request, reply) => {
      const limit = request.query.limit;
      //  where 的条件查询
      const {rows: results, count: totalCount} = await models.goods.findAndCountAll({
        // 基于 shop_id 的条件查询
        where: {
          shop_id: request.params.shopId,
        },
        attributes: [
          'id',
          'name'
        ],
        limit: limit,
        offset: (request.query.page - 1) * limit,
      });
      reply({results, totalCount})
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺的商品列表',
      validate: {
        query: {
          ...paginationDefine
        }
      }
    },
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/createdOrder`,
    handler: async (request, reply) => {
      reply();
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '创建订单',
      validate: {
        payload: {
          goodList: Joi.array().items(
            Joi.object().keys({
              goods_id: Joi.number().integer(),
              count: Joi.number().integer()
            })
          )
        }
      }
    }
  }
];