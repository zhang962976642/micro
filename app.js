/**
 * @description 项目入口文件
 * @createTime 2018/02/23
 * @author zhang962976642 
*/

const Micro = require("./lib/core");

let app = new Micro(),
  expressApp = app.app || null;

app.initRouter();

expressApp && expressApp.listen("3000", () => { console.log("success") })