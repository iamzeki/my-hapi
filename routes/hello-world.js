const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('hapi');
    }
  }
]

module.exports = routes