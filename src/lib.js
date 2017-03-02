const Request = require('./Request');
const Response = require('./Response');

const stack = [];

const handle = (name, middlewares, controller) => async (event, context) => {
  // Middlewares are optional to have the same interface like express
  if (!controller) {
    controller = middlewares;
    middlewares = [];
  }

  const req = new Request(event);
  const res = new Response(context);

  // We need to clone the array used by all handle
  let stackWithController = stack.slice(0);

  // Add the controller specific middlewares
  stackWithController = stackWithController.concat(middlewares);

  // A controller is also a middleware
  stackWithController.push(async (req, res, next) => controller(req, res));

  // Index for the current middleware
  let idx = -1;
  async function next(err) {
    if (err) {
      throw err;
    }

    // We can never overflow due the fact that the controller is not calling next()
    ++idx;
    await stackWithController[idx](req, res, next);
  }

  // The central try/catch sending the error preventing unhandled errors
  try {
    await next();
  } catch (err) {
    res.status(400).send(err);
  }

  // Always finalize the lambda at the end
  res.end();
};

const use = middleware => stack.push(middleware);

module.exports = { handle, use };
