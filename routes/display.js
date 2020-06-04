const express = require('express');
let Display = require('../models/form.model.js');
const router = express();
router.set('view engine', 'ejs');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.get('/', function (req, res) {
    Display.find().then(display => {  //.sort({_id:-1}).limit(1)
        //var main = JSON.stringify(display)
        //main = main.slice(1, main.length-1)
        //main = JSON.parse(main)
        //console.log(display)
        res.render('display.ejs', { form: display })
    })
});

router.post('/', urlencodedParser, (req, res) => {
    const _id = req.body._id;
    var myquery = { _id: _id };
    var newvalues = { $set: { checked: false } };
    Display.updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
    res.redirect('/display');
});

module.exports = router;