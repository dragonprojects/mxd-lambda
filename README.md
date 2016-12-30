# Development

For starting a new project or see the `mxd-environment` in action a template is available:
https://github.com/maxdome/mxd-environment-template

## Example

* `app.js` (with babel and destructioning):
  
```
const { app, checkhelper, config, express, healthcheck, info, logging, silentLogging }
  = require('mxd-environment')();
  
// example route
  
app.get('/', (req, res) => {
  res.send('Hello World!');
});  
```
  
* `app.js` (without babel):
  
```
const environment = require('mxd-environment')();
const app = environment.app;

// example route

app.get('/', (req, res) => {
  res.send('Hello World!');
});
```

## Optional NPM packages

### mxd-starter (PM2 integration)

* `package.json`:

```
{
  "scripts": {
    "start": "mxd-start",
    "status" : "mxd-status",
    "stop" : "mxd-stop"
  },
  "dependencies: {
    "mxd-starter": "^2.1.0"
  }
}
```

### mxd-swagger

`mxd-environment` will automatically setting up the package if its installed.

* `package.json`:

```
{
  "dependencies: {
    "mxd-swagger": "^1.0.5"
  }
}
```

## Upgrade from mxd-environment v4.x

* `mxd-starter` is now an optional dependency. It must be defined as project dependency if its in use 
* `mxd-swagger` is now automatically setting up if its installed


## Upgrade from mxd-environment v3.x

* `mxd-config` handles also the `all.json` and `development.json`. The code to require them can be removed. Also the 
`config` param to initialize `mxd-environment` must be removed. The `config` is available via `environment.config`
* The express `app` is now initialized (includes also the `.listen()`) by the library, use it via `environment.app`, 
the express library is available via `environment.express`
* The `app` param is removed from `environment.info()` and `environment.healthcheck()`
* `environment.healthcheck.checkhelper` is now `environment.checkhelper`


# Systemadministration

Documentation contains all subpackages and the additional `mxd-swagger`.

## Configuration

All configurations can be overwritten in the `config/properties.json`.
There are different attributes offered by the different subpackages of the `mxd-environment` and different depending on 
the application itself.

**Important:** If an attribute is overwritten, the complete tree of the attribut must be defined!

* `mxd-express`:
```
{
  "port": 80,
  "hostname": undefined
}
```

* `mxd-logging` (mandatory for logging into file):
```
{
  "logging": {
    "transports": [
      { 
        "type": "File",
        "options": { 
          "filename": "/path/to/the/logfile.log",
          "level": "info"
        }
      }
    ]
  }
}
```

* `mxd-starter`: A bit special and descriped separatly https://github.com/maxdome/mxd-starter

## Routes

* `mxd-express`: `/ping` (all HTTP verbs are allowed) response a 200 if the app is running and shouldn't be restricted

* `mxd-healthcheck`, `mxd-info`, `mxd-swagger`: All routes starting with `/docs`, `/health`, `/info` and the route 
`/api-docs` should be available in the office network or restricted by basic auth
