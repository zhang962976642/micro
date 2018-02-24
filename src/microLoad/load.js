/**
 * @class MicroLoad
 * @description 用于加载路由，控制器，逻辑层等业务需求
 * @method loadRoutes 静态方法用于加载路由信息
 *  @param {string} dir 需要加载的路由文件地址
 *  @return {string, array} error模块错误提示信息，readFileArrs成功加载的模块信息
 * @method loadControllers 用于加载控制器
 *  @param {string} dir 需要加载的控制器文件地址
 *  @return {string, array} error模块错误提示信息，readFileArrs成功加载的模块信息
 * @method loadServices 用于加载业务逻辑
 *  @param {string} dir 需要加载的业务逻辑文件地址
 *  @return {string, array} error模块错误提示信息，readFileArrs成功加载的模块信息
 * @createTime 2018/02/24
 * @author zhang962976642
*/

const path = require("path"),
  config = require("../../config/config"),
  readLoaderFiles = require("./loadFile");

class MicroLoad {
  load(dir){
    let fileDir = dir ? path.resolve(__dirname, dir) : null,
      { error, readFileArrs } = readLoaderFiles(fileDir);
    if(error){
      // 这里可写入日志
      console.log(error);
    };
    return readFileArrs;
  }
  loadRoutes(){
    return this.load(config.defaultRouterPath || null);
  }
  loadControllers(){
    return this.load(config.defaultControllerPath || path);
  }
  loadServices(){
    return this.load(config.defaultServicesPath || null);
  }
};

module.exports = MicroLoad;