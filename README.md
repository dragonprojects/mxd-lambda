# Example

```javascript
const lambda = require('mxd-lambda')(logger);

lambda.use(require('mxd-cors')());

module.exports = {
  example: lambda.handle('example', (req, res) => {
    res.send();
  }),
};
```
