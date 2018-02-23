/**
 * @description 同步加载文件信息，为router、controller、services提供自动加载服务
 * @createTime 2018/02/23
 * @author zhang962976642
 * @method readLoaderFiles
 * @param {*String} dir 需要加载的文件路径,这里以项目启动路径为基准的相对路径
 * @return
*/

const fs = require("fs");
const path = require("path");

const readLoaderFiles = (dir) => { 
  return new Promise((resolve, reject) => { 
    if (!dir || typeof dir !== "string") { 
      return reject(new Error("需要读取的文件路径不存在，或不是一个字符串。"));
    };
    fs.readdir(dir, (err, files) => {
      if (err) { 
        return reject(err);
      };
      // files type Array [1.js, 2.js,3.js]
      let filrArr;
      fileArr = files.map((fileItem) => { 
        let module = require(dir + "/" + fileItem);
        return { name: fileItem.substr(0, fileItem.lastIndexOf(".")), module };
      });
      return resolve(fileArr);
    });
  });
};
readLoaderFiles(path.resolve(__dirname, "../controllers")).then(val => console.log(val)).catch(err => console.log(err));
module.exports = readLoaderFiles;