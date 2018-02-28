/** 
 * @method isGetterSetter
 * @description 判断某对象上的某个方法是否包含getter以及setter，当某个属性拥有时，不可以被遍历
 * @param {object} obj 需要某对象的原型
 * @param {string} prop 对象原型上的方法
 * @return {boolean} true 不可遍历， false 可遍历
 * @author zhang962976642
 * @createTime 2018/02/26
 * 
*/

const path = require("path"),
  { controllersPath, servicesPath, pluginsPath, modelsPath } = require("./config/config");
  loadFile = require("./middleware/loadFile");

function isGetterSetter(obj, prop){
  // 获取对象的某方法详情信息
  let objDesc = Object.getOwnPropertyDescriptor(obj, prop);
  return objDesc && (obj.get instanceof Function || obj.set instanceof Function) || false;
};

/** 
 * @class MicroLoad
 * @extends null
 * @description 加载核心配置文件controller以及service
 * @prop null
 * @static loader
 *   @description 调用加载文件方法
 *   @param {string} dir 加载文件的路径
 *   @param {object} obj 挂载类的临时对象
 *   @return null
 * @method loadControllers
 *   @description 加载controller文件，将控制器挂载在app.controllers[name][method]
 *   @param {obj} app 项目实例类对象
 *   @return null
 * @method loaderServices 记载services
 *   @description 加载service文件，将业务逻辑挂载在app.services[name]，这里的service是类本身
 *   @param {obj} app 项目实例类对象
 *   @return null
*/

class MicroLoad {

  static loader(dir, obj){
    
    if (dir && Object.prototype.toString.call(obj) === "[object Object]" ){
      return loadFile(dir, obj);
    };

  }

  loadControllers(app){

    let controllers = {},
      dir = path.resolve(__dirname, controllersPath);
    app.controllers = {};

    MicroLoad.loader(dir, controllers);

    for(let name in controllers){

      app.controllers[name] = {};
      let props = Object.getOwnPropertyNames(controllers[name].prototype);
      
      for(let prop of props){
        // 过滤构造函数、以_私有方法、以及携带getter或者setter的方法
        if(prop === "constructor" || prop[0] === "_"
          || isGetterSetter(controllers[name].prototype, prop)){
          continue;
        }

        app.controllers[name][prop] = (req, res, next) => {
          let ctx = { req, res, next, services: app.services || null, controllers: app.controllers 
            || null, plugins: app.plugins || null, models: app.modules || null },
            currentClass = new controllers[name](ctx);
          return currentClass[prop]();
        };

      };

    };
  }
  
  loadServices(app){

    let services = {},
      dir = path.resolve(__dirname, servicesPath);
    app.services = {};

    MicroLoad.loader(dir, services);

    for(let name in services){
  
      if(!app.services[name] || app.services[name] === undefined){
        app.services[name] = services[name];
      };

    };

  }

  loadPlugins(app){

    let plugins = {},
      dir = path.resolve(__dirname, pluginsPath);
    app.plugins = {};

    MicroLoad.loader(dir, plugins);

    for(let name in plugins){
      if(!app.plugins[name] || app.plugins[name] === undefined){
        app.plugins[name] = plugins[name];
      };
    }

  }

  loadModels(app){

    let models = {},
      dir = path.resolve(__dirname, modelsPath);
    app.models = {};

    MicroLoad.loader(dir, models);

    for(let name in models){
      if(!app.models[name] || app.models[name] === undefined){
        app.models[name] = models[name];
      }
    };

  }

};

module.exports = MicroLoad;