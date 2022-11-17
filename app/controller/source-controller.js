const path = require("path");
const fs = require("fs");
const { extname, resolve } = require("path");
const {
  promises: { writeFile, appendFile },
  existsSync,
} = require("fs");
const { getServerHost } = require("../../common");

// 判断文件夹是否存在，如果不存在则创建文件夹
const dirExists = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (dirExists(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
};

// 将 bytes 转为 mb
const bytesToSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
};

// 文件上传,单图片上传
exports.uploadImage = async (req, res, next) => {
  try {
    const filesArray = [].concat(...Object.values(req.files));
    const uploadResult = [];
    // 遍历数组
    for (let i = 0; i < filesArray.length; i++) {
      const { name, mimetype, data, size, md5 } = filesArray[i];
      const ext = extname(name);
      const fileName = resolve(
        __dirname,
        `../../public/uploads/${ext}/`,
        `${md5}${ext}`
      );
      if (!dirExists(path.dirname(fileName))) {
        return res.status(500).json({
          status: 500,
          data: null,
          message: "文件夹创建失败",
        });
      }
      if (existsSync(fileName)) {
        uploadResult.push({
          name,
          mimetype,
          size: bytesToSize(size),
          url: `${getServerHost(req)}/uploads/${ext}/${md5}${ext}`,
        });
      } else {
        await writeFile(fileName, data);
        uploadResult.push({
          name,
          mimetype,
          size: bytesToSize(size),
          url: `${getServerHost(req)}/uploads/${ext}/${md5}${ext}`,
        });
      }
    }
    return COMMON.success(res, uploadResult, "上传成功");
  } catch (error) {
    next(error);
  }
};

// 文件上传,切片断点
exports.uploadImageChunk = async (req, res, next) => {};
