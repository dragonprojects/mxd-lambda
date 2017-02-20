class Request {
  constructor(event) {
    this.event = event;
    if (event.body) {
      this.body = JSON.parse(event.body);
    }
    this.method = event.httpMethod;

    /*
     * Headers are case insensitive. Node lower case all headers in the 'http'
     * module which is not in use for lambda, but a feature request is
     * contributed to serverless:
     * https://github.com/serverless/serverless/issues/2765
     */
    this.headers = {};
    Object.keys(event.headers).forEach((key) => {
      this.headers[key.toLowerCase()] = event.headers[key];
    });
  }
}

module.exports = Request;
