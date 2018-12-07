const Hapi = require('hapi');
require('env2')('./.env'); // 引入环境配置
const config = require('./config');
const routesHelloWorld = require('./routes/hello-world');
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');

const server = new Hapi.Server();
// 配置服务器启动 host 与端口
server.connection({
  port: config.port,
  host: config.host,
});

const init = async () => {
  await server.register([
    // 使用 hapi-swagger
    ...pluginHapiSwagger,
    // 分页插件
    pluginHapiPagination,
  ]);
  server.route([
    ...routesHelloWorld,
    ...routesShops,
    ...routesOrders,
  ]);
  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();