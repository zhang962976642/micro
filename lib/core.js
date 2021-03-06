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
    this.loader.loadPlugins(this);
  }

  static validateExtendFile(obj){
    let {name,val} = obj;
    if(!name || !val || Object.keys(val).length <= 0){
      throw new Error(name + "对象挂载失败。");
    };
  }

  initRouter() { 

    const setRouter = (app) => { 
      
      const routes = getRoutes(app), 
        expressApp = app.app;

      app.loader.loadServices(app);
      Micro.validateExtendFile({
        name: "services",
        val: app.services
      });

      routes && Object.keys(routes).forEach((key) => { 
        const [method, path] = key.split(" ");
        expressApp[method.toLowerCase()](path, routes[key]);
      });
    };

    // 验证Controllers
    Micro.validateExtendFile({
      name: "controllers",
      val: this.controllers
    });
    
    // 注入路由，注入app对象
    setRouter(this);
  }
};

module.exports = Micro;