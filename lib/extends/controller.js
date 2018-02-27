/**
 * @class Controller 
 * @description Controller控制器
 * @extends null
 * @author zhang962976642
 * @createTime 2018/02/26
*/

const validate = require("../middleware/validate");

class Controller{
    constructor(){
      this.validate = validate;
    }
    // 获取请求头访问类型
    get method(){
      return this.app;
    }
    // 获取ip地址信息
    get ip(){
      return this.app;
    }

};

module.exports = Controller;