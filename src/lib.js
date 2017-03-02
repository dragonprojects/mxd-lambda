const Request = require('./Request');
const Response = require('./Response');

const stack = [];
const use = middleware => stack.push(middleware);

const handle = (name, controller) => async (event, context) => {
  const req = new Request(event);
  const res = new Response(context);

  // A controller is also a middleware
  const stackWithController = stack;
  // stackWithController.push(async (req, res, next) => await controller(req, res));

  // Index for the current middleware
  let idx = -1;

  await next();
  async function next(error) {
    if (error) {
      return res.status(400).send(error);
    }

    idx++;
    if (idx >= stackWithController.length) {
      // We are done, work from inner to outer again
      return;
    }

    await stackWithController[idx](req, res, next);
  }

  // We need to call a end() again otherwise the response fail's
  res.end();
};

module.exports = {
  use,
  handle
};