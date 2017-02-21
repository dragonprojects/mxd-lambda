# Example

```
const lambda = require('mxd-lambda')(logger);

lambda.use(require('mxd-cors')());

module.exports = {
  example: lambda.function('example', (req, res) => {
    res.send();
  }),
};
```
