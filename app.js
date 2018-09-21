const Hapi = require('hapi');
require('env2')('./.env') // 引入环境配置
const config = require('./config')
const routesHelloWorld = require('./routes/hello-world')

const server = new Hapi.Server();
// 配置服务器启动 host 与端口
server.connection({
  port: config.port,
  host: config.host,
});

const init = async () => {
  server.route([
    ...routesHelloWorld
  ]);
  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();