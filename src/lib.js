const Request = require('./Request');
const Response = require('./Response');

module.exports = logger => {
  const middlewares = [];
  return {
    use: (middleware) => {
      middlewares.push(middleware);
    },
    function: (name, controller) => async (event, context) => {
      const req = new Request(event);
      logger.debug(`Request for '${name}' with headers '${JSON.stringify(req.headers)}' and body '${JSON.stringify(req.body)}'`);
      const res = new Response(context);
      try {
        middlewares.forEach(async (middleware) => {
          await new Promise((resolve, reject) => {
            middleware(req, res, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
        });
        await controller(req, res);
      } catch (e) {
        logger.warn(`Error: ${e.message}`);
        res.status(400).send(e.message);
      }
      logger.debug(`Response for '${name}' with statusCode '${res.statusCode}', headers '${JSON.stringify(res.headers)}' and body '${JSON.stringify(res.body)}'`);
    }
  };
};
