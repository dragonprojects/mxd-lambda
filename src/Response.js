class Response {
  constructor(context) {
    this.context = context;
    this.body = '';
    this.headers = {};
    this.statusCode = 204;
  }

  set(key, value) {
    this.headers[key] = value;
    return this;
  }

  setHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  get(key) {
    return this.headers[key];
  }

  getHeader(key) {
    return this.headers[key];
  }

  removeHeader(key) {
    delete this.headers[key];
    return this;
  }

  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  send(body) {
    if (typeof body !== 'string') {
      this.body = JSON.stringify(body);
    }
    this.end();
    return this;
  }

  end() {
    this.context.succeed({
      body: this.body,
      headers: this.headers,
      statusCode: this.statusCode
    });
    return this;
  }
}

module.exports = Response;
