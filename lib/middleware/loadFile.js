/**
 * @method readLoaderFiles
 * @description 同步加载文件信息，方便为业务提供自动加载功能
 * @param {string} path 需要加载的文件路径,这里以项目启动路径为基准的相对路径
 * @return null
 * @createTime 2018/02/23
 * @author zhang962976642
*/

const fs = require("fs"),
  path = require("path");

const readLoaderFiles = (pathName, objs) => {
  
  let files = null;

  try{

    if(!pathName || (pathName && typeof pathName !== "string")){
      throw new Error("读取的文件路径不是一个字符串。");
    };

    files = fs.readdirSync(pathName);

    if (files.length <= 0) {
      throw new Error(pathName + "下无文件信息。");
    };
    
    for (let file of files){
      let baseFile, name, stat;

      baseFile = pathName + "/" + file;
      name = path.basename(file, ".js");
      stat = fs.statSync(baseFile);
      if (stat.isFile()){
        let loadClass = require(baseFile);
        if(objs[name] === undefined){
          objs[name] = loadClass;
        };
        
      }else if(stat.isDirectory()){
        readLoaderFiles(pathName + "/" + file, objs);
      };
    };

  }catch(error){
    // 这里可以写入启动日志
    throw new Error(error);
  };

};

module.exports = readLoaderFiles;