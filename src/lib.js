const Request = require('./Request');
const Response = require('./Response');

const stack = [];

const handle = (name, controller) => async (event, context) => {
  const req = new Request(event);
  const res = new Response(context);

  // We need to clone the array used by all handle
  const stackWithController = stack.slice(0);

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