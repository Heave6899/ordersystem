const express = require('express');
let Display = require('../models/data.model.js');
const router = express();
router.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("today.csv");
const { Parser } = require('json2csv');

// var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))
router.get('/:page', function (req, res, next) {
    var perPage = 9
    var page = req.params.page || 1
    Display.find().skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, data) {
        Display.countDocuments().exec(function(err, count) {
            if (err) return next(err)
            res.render('display.ejs', {form: data,current: page,pages: Math.ceil(count / perPage)})
    })
})
});

router.post('/save', function (req,res){
    Display.find().then(data=>{
        const fields = ['v1', 'v2', 'v3', 'i1', 'i2', 'i3'];
        const json2csvParser = new Parser({fields});
        const csv = json2csvParser.parse(data);
        fs.writeFile('today.csv', csv, function(err) {
            if (err) throw err;
            console.log('data file saved');
          });
    })
    res.redirect('/display/1');
});
// router.post('/', urlencodedParser, (req, res) => {
//     const _id = req.body._id;
//     var myquery = { _id: _id };
//     var newvalues = { $set: { checked: false } };
//     Display.updateOne(myquery, newvalues, function (err, res) {
//         if (err) throw err;
//         console.log("1 document updated");
//     });
//     res.redirect('/display');
// });

module.exports = router;