const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('hapi');
    },
    config: {
      // config 字段增加 tags:['api'] 即可将路由暴露为 Swagger 文档，第二个参数选填，可以将接口进行一定的 group 分组管理，接口将被折叠如对应的 group 分类
      tags: ['api', 'tests'],
      description: '测试hello-world' // 接口描述
    }
  }
]

module.exports = routes