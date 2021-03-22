const express = require('express');
const router = express.Router();
const Photo = require('../model/Photo')

router.get('/', (req, res) => {
  console.log(req.query)
  const skip = Number(req.query.skip) || 0
  const limit = Number(req.query.limit) || 10
  var count;
  Photo.find({ catagory: req.query.catagory }).then(photo => {
    count = photo.length
    Photo.find({ catagory: req.query.catagory })
      .skip(skip)
      .limit(limit)
      .then((cat) => {
        const cata = cat.filter((value) => {
          return value.catagory != "advertizement"
        })

        console.log(cata)
        res.json({
          count,
          cata
        })
      }).catch(err => {
        console.log('not working' + err)
        res.json(err)
      })
  })



});
router.get('/advert', (req, res) => {

  Photo.find({ catagory: "advertizement" })
    .then((advert) => {
      console.log(advert)
      res.json(advert)
    }).catch(err => {
      console.log('not working' + err)
      res.json(err)
    })


});
router.get('/unique', (req, res) => {
  console.log(req.query)
  const skip = Number(req.query.skip) || 0
  const limit = Number(req.query.limit) || 10
  const sort = req.query.sort
  Photo.find().count().then((count) => {
    Photo.find()
      .sort({
        catagory: 1
      })
      .skip(skip)
      .limit(limit)
      .then((cat) => {
        const cata = cat.filter((value) => {
          return value.catagory != "advertizement"
        })
        console.log(cata)
        res.json({
          count,
          cata
        })
      }).catch(err => {
        console.log('not working' + err)
        res.json(err)
      })
  })

});


router.post('/', (req, res) => {

  console.log(req.body)

  const catagory = new Photo({
    catagory: req.body.catagory,
    photourl: req.body.photourl
  })
  catagory.save().then(() => {
    console.log('data created ')
    res.json({
      msg: "successfully added to db"
    })
  }
  ).catch(err => {
    console.log('this is err' + err)
  })

});


module.exports = router;