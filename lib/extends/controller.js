/**
 * @class Controller 
 * @description Controller控制器
 * @extends null
 * @author zhang962976642
 * @createTime 2018/02/26
*/

class Controller{

    constructor(ctx){
      this.ctx = ctx;
    }
    
    // 获取请求头访问类型
    get method(){
      return this.ctx.req.method;
    }
    
    // 获取ip地址信息
    get ip(){
      return "aaa";
    }

};

module.exports = Controller;