var express = require('express');
const fs = require("fs");
var faker = require('faker');
function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }
}

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/mock', function (req, res) {
    res.json(JSON.parse(fs.readFileSync("routes/nearby.json")))
})

router.get('/banner', function (req, res) {
    res.json(JSON.parse(fs.readFileSync("routes/banner.json")))
})
router.get('/info', function (req, res) {
    res.json(JSON.parse(fs.readFileSync("routes/info.json")))
})
router.get('/video', function (req, res) {
    function genVideo() {
        var data = []
        for (let i = 0; i < 20; i++) {
            var items = {
                "avatar": faker.image.avatar(),
                "name":faker.internet.userName(),
                "desc":faker.finance.transactionDescription(),
                "image":faker.image.image()

            };
            if (i %2===0){
                items.video = "http://videos.jzvd.org//v/%E9%A5%BA%E5%AD%90%E4%B8%BB%E5%8A%A8.mp4"
            }
            data.push(
                items
            )

        }
        return data
    }
    res.json(genVideo())
})
function genImage() {
    var images=[]
    for (let i = 0; i < randomNum(1,4); i++) {
            images.push(faker.image.image())
    }
    return images
}

router.get('/moment', function (req, res) {
    function genMoment() {
        var data = [];


        for (let i = 0; i < 20; i++) {
            var items = {
                "avatar": faker.image.avatar(),
                "name":faker.internet.userName(),
                "content":faker.finance.transactionDescription(),
                "image":genImage()

            };
            if (i %2===0){
                items.video = "http://videos.jzvd.org//v/%E9%A5%BA%E5%AD%90%E4%B8%BB%E5%8A%A8.mp4"
            }
            data.push(
                items
            )

        }
        return data;
    }

    res.json(genMoment())
})
module.exports = router;
