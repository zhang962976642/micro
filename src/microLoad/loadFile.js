/**
 * @description 同步加载文件信息，方便为业务提供自动加载功能
 * @createTime 2018/02/23
 * @author zhang962976642
 * @method readLoaderFiles
 * @param {string} path 需要加载的文件路径,这里以项目启动路径为基准的相对路径
 * @return {string, array} error模块错误提示信息，readFileArrs成功加载的模块信息
*/

const fs = require("fs");

const readLoaderFiles = (path) => {
  let dir, errorMsg, readFileArrs;
  dir = errorMsg = readFileArrs = null;

  if (!path || (path && typeof path !== "string")) {
    errorMsg = "需要读取的文件路径不是一个字符串。";
    return { error: errorMsg, readFileArrs };
  };
  try {
    dir = fs.readdirSync(path);
    if (!dir || dir.length <= 0) {
      errorMsg = path + "是空文件夹。";
      return { error: errorMsg, readFileArrs };
    };
    readFileArrs = dir.map((file, index) => {
      let module, name;
      module = require(path + "/" + file);
      name = file.substr(0, file.lastIndexOf("."));
      return { name, module };
    });
  } catch (error) {
    errorMsg = error.message;
  };
  return { error: errorMsg, readFileArrs };
};

module.exports = readLoaderFiles;
