const request = require("request");
const fs = require("fs");

function downloadFileSync(filesURL, fileNames, filePath, success, error) {
  // 创建保存文件的目录（如果不存在）
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }

  // 遍历 URL 列表并下载文件
  filesURL.forEach((fileUrl, index) => {
    const fileName = fileNames[index] || index; // 可以根据需要自定义文件名
    const filePath = `${filePath}/${fileName}`;
    // 发起 GET 请求并将文件保存到本地
    request(fileUrl)
      .pipe(fs.createWriteStream(filePath))
      .on("close", success)
      .on("error", error);
  });
}

module.exports = {
  downloadFileSync,
};
