/** 
 * @class User
 * @description 用户模块逻辑控制器
 * @extends Controller
 * @method userHome
 *   @description 用户模块首页逻辑
 *   @param {object} ctx -> {req: obj, res: obj, next: function, services: obj}
 * @createTime 2018/02/27
 * @author zhang962976642
 * 
*/

const Controller = require("../lib/extends/Controller");

class User extends Controller {
  constructor(props){
    super(props);
  }

  userHome(ctx){
    // ctx -> {req: obj, res: obj, next: function, services: obj}
    this.validate({});

    // todo 需要使用多个services需实例化多个
    let { services } = ctx,
      userService = new services.user(),
      data = userService.getUsers(),
      logs = userService.getLogger();
    console.log(data);
    console.log(logs);
    return data;
  }

};

module.exports = User;