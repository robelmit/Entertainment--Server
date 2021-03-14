const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.join('C:', 'Users', 'Robel', 'Desktop', 'FimApp', '/Uploads')));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage }).single('file');

router.post('/', (req, res, next) => {
  console.log('a');
  upload(req, res, (err) => {
    if (err) {
      next(err);
      console.log(err)
    }
    res.status(200).json({
      message: 'image successfully uploaded',
      url: res.req.file.filename,
    });
  });
})
router.post('/login', (req, res) => {
  const user = {
    name: "admin",
    password: "12345678"
  }
  if (req.body.name == user.name && req.body.password == user.password) {
    res.json({
      message: "successfully logged in "
    })
  }
  else res.status(400).json({ error: "incorrect username or password" })
})
module.exports = router;


// i am a professional software engineer with over 10 years of experience