/** 
 * @description 用户信息路由配置对象
 * @createTime 2018/02/24
 * @author zhang962976642
 * @method 匿名函数
 * @param {object} app Micro实力对象
 * @return {object} key -> controller
*/

module.exports = (app) => {
  let controllers = app.controllers || null;
  return {
    "GET /": new controllers.user().gets
  }
}