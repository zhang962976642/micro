/** 
 * @class User
 * @description 用户模块逻辑控制器
 * @constructor {obj} ctx -> {req: obj, res: obj, next: function, services: obj, controllers: obj}
 * @extends Controller
 * @method userHome
 *   @description 用户模块首页逻辑
 * @createTime 2018/02/27
 * @author zhang962976642
 * 
*/

const Controller = require("../lib/extends/Controller");

class User extends Controller {
  constructor(ctx){
    super(ctx);
    this.ctx = ctx;
  }

  userHome(){
    // ctx -> {req: obj, res: obj, next: function, services: obj, controllers: obj}
    this.validate({});

    // todo 需要使用多个services需实例化多个
    let { services } = this.ctx,
      userService = new services.user(),
      data = userService.getUsers(),
      logs = userService.getLogger();
    console.log(this.method);
    return data;
  }

};

module.exports = User;