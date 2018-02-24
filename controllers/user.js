/**
 * @class User
 * @description 用户逻辑控制器
 * @param {object} 需要继承的属性或对象
 * @createTime 2018/02/24
 * @author zhang962976642
*/

const Controller = require("../src/microController/controller");

class User extends Controller {
  constructor(props){
    super(props);
  }
  gets(ctx) {
    let { req, res, next, services } = ctx;
    services.user.getUser();
  }
};

module.exports = User;