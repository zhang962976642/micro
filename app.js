/**
 * @description 项目入口文件
 * @createTime 2018/02/23
 * @author zhang962976642 
*/

const microCore = require("./lib/core");

global.Micro = new microCore();
 
let app = Micro.app || null;

// initRouter
Micro.initRouter();
app && app.listen("3000", () => { console.log("success") });