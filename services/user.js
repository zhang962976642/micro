/**
 * @class User
 * @description user业务逻辑模型
 * @constructor null
 * @method getUsers
 *   @description 测试查询用户信息
 *   @param {obj} 查询参数对象
 *   @return {obj}
 * @createTime 2018/02/27
 * @author zhang962976642
 * 
*/
const Service = require("../lib/extends/service");

class User extends Service {
  constructor(props){
    super(props)
  }

  getUsers(obj){
    // dao
    let x = {
      name: "123"
    };
    return x;
  }
};

module.exports = User;