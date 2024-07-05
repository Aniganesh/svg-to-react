import express from "express";
import multer from "multer";
import { convertSvgToReact } from "./script.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
 const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, "/tmp/my-uploads");
   },
   filename: function (req, file, cb) {
     cb(null, file.filename);
   },
 });

app.post("/convert", multer({ storage: storage }), (req, res) => {
 
  // const convertedFiles = convertSvgToReact("./files");
  // res.send(convertedFiles);
});

app.listen(port);
