import nextConnect from "next-connect";
var fs = require("fs");
var multer = require("multer");
const sharp = require("sharp");
const handler = nextConnect();

var uploadPath = null;
var fileName = null;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    uploadPath =
      "./public/posts/" +
      new Date().getFullYear() +
      "/" +
      ("0" + (new Date().getMonth() + 1) + "0".slice(-3, -1)) +
      "/";
    var originalUploadPath = uploadPath + "original";
    if (!fs.existsSync(originalUploadPath)) {
      fs.mkdirSync(originalUploadPath, { recursive: true });
    }
    cb(null, originalUploadPath);
  },
  filename: function (req, file, cb) {
    fileName = file.originalname.trim().split(" ").join("-");
    var resFileName = fileName;
    var originalUploadPath = uploadPath + "original";
    var i = 1;
    console.log(originalUploadPath + "/" + fileName);
    while (fs.existsSync(originalUploadPath + "/" + fileName)) {
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
  var sizes = [1200, 1000, 600];
  let allImageData = [];

  Promise.all(
    sizes.map(async function (size) {
      var sizePath = uploadPath + size + "/";
      if (!fs.existsSync(sizePath)) {
        fs.mkdirSync(sizePath, { recursive: true });
      }
      try {
        var mydata = await sharp(req.file.path)
          .resize({ width: size, withoutEnlargement: true })
          .toFile(sizePath + fileName);
      } catch (error) {
        res.status(500).send({message: "Some error occured."});
        console.log(error);
      }

      var frontEndPath = (sizePath + fileName).split("/").slice(2).join("/");
      console.log(frontEndPath);
      allImageData.push("/" + frontEndPath);
    })
  )
    .then((data) => {
      var originalImagePath = (uploadPath + "original/" + fileName)
        .split("/")
        .slice(2)
        .join("/");
      allImageData.push("/" + originalImagePath);
      res.send(allImageData);
    })
    .catch((error) => {
      res.send(error);
    });
});
export default handler;
