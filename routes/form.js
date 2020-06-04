const express = require('express');
let form = require('../models/form.model.js');
const router = express();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// respond with "hello world" when a GET request is made to the homepage
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
}
);
// router.route('/').get((req,res) => {
//     Product.find()
//     .then(products => res.json(products))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.post('/', urlencodedParser, (req, res) => {
    const party = req.body.party;
    const date = Date(req.body.date);
    const type1 = req.body.type1;
    const type2 = req.body.type2;
    const box = req.body.box;
    const checked = true;
    const size = req.body.size;
    if (size == 'Other') {
        const other = req.body.other;
        const newdata = new form({ date, party, size, other, type1, type2, box, checked });
        newdata.save().then(() => res.json('order added successfully' + newdata))
            .catch(err => res.status(400).json('Error: ' + err));
        res.redirect('/form');
    }
    else {
        const newdata = new form({ date, party, size, type1, type2, box, checked });
        console.log(newdata);
        newdata.save().then(() => res.json('order added successfully' + newdata))
            .catch(err => res.status(400).json('Error: ' + err));
        res.redirect('/form');
    }
});

module.exports = router;