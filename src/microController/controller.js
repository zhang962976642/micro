/**
 * @class Controller
 * @description 项目控制器类
 * @createTime 2018/02/24
 * @author zhang962976642
*/

// 此controller可以注入logger等常用中间件
class Controller {
  response(){
    return "get response";
  }
  request(){
    return "get request";
  }
};

module.exports = Controller;
