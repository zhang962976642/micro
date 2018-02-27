/**
 * @description Micro核心文件
 * @createTime 2018/02/23
 * @author zhang962976642
 * @extends classExpress 此对象在继承时得到的是express的实例对象
*/

const express = require("express");
const loader = require("./loader");
const getRoutes = require("../routes/router");

function classExpress() {
  this.app = new express();
};

class Micro extends classExpress {

  constructor(props) {

    super(props);
    this.loader = new loader();
    this.loader.loadControllers(this);

  }

  initRouter() { 
    
    const setRouter = (app) => { 
      
      const routes = getRoutes(app), 
        expressApp = app.app;

      app.loader.loadServices(app);

      Object.keys(routes).forEach((key) => { 
        const [method, path] = key.split(" ");
        expressApp[method.toLowerCase()](path, routes[key]);
      });
    };
    // 注入路由，注入app对象
    setRouter(this)
  }
};

module.exports = Micro;