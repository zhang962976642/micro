/**
 * @description Micro核心文件
 * @createTime 2018/02/23
 * @author zhang962976642
 * @extends express 
*/

const express = require("express");
const MicroLoad = require("./microLoad/load");
const getRoutes = require("../routes/router");

function classExpress() {
  this.app = new express();
};

class Micro extends classExpress {
  constructor(props) {
    super(props);
    this.load = new MicroLoad();
    const controllers = this.load.loadControllers();
    this.controllers = {};
    controllers && controllers.forEach((controllerItem) => { 
      if (this.controllers[controllerItem["name"]] === undefined) { 
        // 这里写入的是this.controllers是引入的controller模块类对象
        this.controllers[controllerItem["name"]] = controllerItem["module"];
      };
    });
  }
  initRouter() { 
    const setRouter = (app) => { 
      const routes = getRoutes(app),
        services = {},  
        expressApp = app.app;
      app.load.loadServices().forEach((serviceItem) => { 
        if (services[serviceItem["name"]] === undefined) { 
          services[serviceItem["name"]] = new serviceItem["module"]();
        };
      });
      Object.keys(routes).forEach((key) => { 
        const [method, path] = key.split(" ");
        expressApp[method.toLowerCase()](path, (req, res, next) => { 
          const handle = routes[key];
          handle({ req, res, next, services});
        });
      });
    };
    // 注入路由，注入app对象
    setRouter(this)
  }
};

let app = new Micro(),
  expressApp = app.app || null;
app.initRouter();
expressApp && expressApp.listen("3000", () => { console.log("success") })
