import nextConnect from "next-connect";
var fs = require("fs");
var multer = require("multer");
const handler = nextConnect();

var uploadPath = null;
var fileName = null;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    uploadPath =
      "./public/content/images/" +
      new Date().getFullYear() +
      "/" +
      ("0" + (new Date().getMonth() + 1) + "0").slice(-3, -1) +
      "/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    fileName = file.originalname.trim().split(" ").join("-");
    var resFileName = fileName;
    var i = 1;
    while (fs.existsSync(uploadPath + "/" + fileName)) {
      var fileNameArray = resFileName.split(".");
      fileNameArray[0] += i;
      fileName = fileNameArray.join(".");
      i++;
    }
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });
export const config = {
  api: {
    bodyParser: false,
  },
};
handler.post(upload.single("avatar"), async (req, res) => {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  var allImageData = [];
  var originalImagePath = (uploadPath + fileName).split("/").slice(2).join("/");
  res.send("/" + originalImagePath);
});
export default handler;
