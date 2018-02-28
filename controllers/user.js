/** 
 * @class User
 * @description 用户模块逻辑控制器
 * @constructor {obj} ctx -> {req: obj, res: obj, next: function, services: obj, controllers: obj, models: obj, plugins: obj}
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
  }

  userHome(){

    // todo 需要使用多个services需实例化多个
    let {req,res} = this.ctx;
    req.headers["Content-Type"] = "text/html";
    return res.send(`
      <html>
        <head>
          <title>TEST</title>
        </head>
        <body>
          <h3>Update IMG</h3>
          <form method="POST" action="/?a=10">
            <input type="text" name="username" value="555" />
           
            <input type="submit" value="submit" />
          </form>
        </body>
      </html>
    `)
  }

  createHome(){
    let {req,res} = this.ctx;
    console.log(req.query)
    console.log(req.body)
  }

};

module.exports = User;