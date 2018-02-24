/**
 * @description Micro核心文件
 * @createTime 2018/02/23
 * @author zhang962976642
 * @extends express 
*/

const express = require("express");
const MicroLoad = require("./microLoad/load");

class Micro{
  init(){
    this.expressApp = new express();
    this.load = new MicroLoad();
    const controller = this.load.loadControllers();
    this.controller = {};
    controller && controller.forEach((controllerItem) => {
      if(!this.controller[controllerItem["name"]]){
        this.controller[controllerItem["name"]] = controllerItem["module"];
      };
    });
    this.initRouter();
  }
  initRouter(){
    let {expressApp, controller} = this;
    // 这里的controller {user: [Function: User],}
  }
};

var app = new Micro();
app.init();
