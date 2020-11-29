const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mqtt = require('mqtt')
let data = require('./models/data.model.js');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
var client  = mqtt.connect('mqtt://broker.hivemq.com', {keepalive: 1000, reconnectPeriod: 1000 * 1},)



//const uri = 'mongodb+srv://Vantstein:123Vansh@cluster0-fcjmy.mongodb.net/orders?retryWrites=true&w=majority';
//const uri = process.env.ATLAS_URI;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open',()=> {
    console.log('MongoDB database connection established successfully');
})

client.on('connect', function () {
    client.subscribe('pibpump/a')
    client.subscribe('pibpump/b')
    client.subscribe('pibpump/c')
    client.subscribe('pibpump/d')
    client.subscribe('pibpump/e')
    client.subscribe('pibpump/f')
  })
   
  client.on('message', function (topic, message) {
    // message is Buffer
    var s = message.toString();
    var sx = s.split(" ")
    var v1 = sx[0]; var v2 = sx[1];var v3 = sx[2];var i1 = sx[3];var i2 = sx[4];var i3= sx[5];
    //console.log(message.toString())
    var newdata = new data({ topic, v1,v2,v3,i1,i2,i3 });
    newdata.save().then(() => res.json('data added successfully' + newdata))
    .catch(err => res.status(400).json('Error: ' + err));
  })

//const formRouter = require('./routes/form');
const dataRouter = require('./routes/display');

//app.use('/form', formRouter);
app.use('/display',dataRouter);
function handleRedirect(req, res) {
    res.redirect('/display');
  }
app.get('*', handleRedirect);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

