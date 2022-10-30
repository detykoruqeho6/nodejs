const path = require("path");
const fs = require("fs");
const { extname, resolve } = require("path");
const {
  promises: { writeFile, appendFile },
  existsSync,
} = require("fs");
const CacheModule = require("../../package/cache");

// 切片函数
function sliceFileBuffer(fileBuffer) {
  const fileBufferLength = fileBuffer.length;
  const sliceSize = 1024 * 1024 * 2; // 2M
  const sliceCount = Math.ceil(fileBufferLength / sliceSize);
  const sliceList = [];
  for (let i = 0; i < sliceCount; i++) {
    const start = i * sliceSize;
    const end = Math.min(fileBufferLength, start + sliceSize);
    sliceList.push(fileBuffer.slice(start, end));
  }
  return sliceList;
}

// 判断文件夹是否存在，不存在则创建
function mkdirsSync(dirname) {
  if (existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

// 合并切片
function mergeFileBuffer(sliceList) {
  return Buffer.concat(sliceList);
}

exports.uploadImageLocal = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    let uploaded = 0; // 已上传的切片数量

    const file = req.files;
    const files = Object.values(file);
    const result = await Promise.all(
      files.map(async (file) => {
        const { name, size, mimetype, md5 } = file;
        const ext = extname(name);
        const fileName = md5 + ext;
        // 设置当前文件对应的MD5缓存
        const cache = CacheModule.get(md5);
        if (cache) {
          uploaded = Number(cache);
        }

        // 合并切片
        while (uploaded < size) {
          const fileBufferS = await file.data;
          const sliceList = sliceFileBuffer(fileBufferS);
          const fileBufferList = sliceList.map((slice) => {
            return slice;
          });
          const fileBuffer = mergeFileBuffer(fileBufferList);
          const filePath = resolve(
            __dirname,
            `../../public/upload/${fileName}`
          );
          await writeFile(filePath, fileBuffer);
          uploaded += fileBuffer.length;
          CacheModule.set(md5, uploaded);
        }

        // const fileBuffer = file.data;
        // const sliceList = sliceFileBuffer(fileBuffer);
        // const filePath = resolve(
        //   __dirname,
        //   `../../public/upload/${fileName}`
        // );
        // const fileDir = path.dirname(filePath);
        // mkdirsSync(fileDir);
        // const fileStream = fs.createWriteStream(filePath, {
        //   flags: "a",
        // });
        // fileStream.write(sliceList[0]);
        // fileStream.end();
        // uploaded += sliceList[0].length;
        // CacheModule.set(md5, uploaded);
        // 上传完成后删除缓存
        CacheModule.del(md5);
        return {
          name,
          // size 换算成 mb
          size: mimetype,
          md5,
          uploaded,
        };

        // const filePath = path.resolve(
        //     __dirname,
        //     "../../public/images",
        //     fileName
        // );
        // const fileBuffer = file.data;
        // const sliceList = sliceFileBuffer(fileBuffer);
        // const writeStream = fs.createWriteStream(filePath);
        // for (let i = 0; i < sliceList.length; i++) {
        //     writeStream.write(sliceList[i]);
        // }
        // writeStream.end();
        // return {
        //     name,
        //     size,
        //     mimetype,
        //     md5,
        //     filePath,
        // };
      })
    );
    res.json({
      code: 200,
      message: "上传成功",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
