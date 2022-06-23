const express = require('express');
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");

//Routes
const appRoute = require('./Controller/Routes/appRoute');
const userRoute = require('./Controller/Routes/userRoute');



const app = express();


app.use(express.json());


const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.replace(/\\/g, "/"));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: diskStorage, fileFilter: fileFilter }).single("file"));

app.use("/image", express.static(path.join(__dirname, "image")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// app.all("*", (req, res, next) => {
//   res.status(404).json({
//     message: "Can't find a URL on this server!"
//   })
// });

app.use(appRoute);
app.use(userRoute);




mongoose.connect("mongodb+srv://farmsell:farmsell@cluster0.mh36s.mongodb.net/Upclave?retryWrites=true&w=majority", {
  
}).then((success) =>{
  app.listen(3000, () =>{
    console.log("listening on port 3000");
})
}).catch((error) =>{
  console.log(error);
})

