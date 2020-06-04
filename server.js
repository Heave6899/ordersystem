const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//const uri = 'mongodb+srv://Vantstein:123Vansh@cluster0-fcjmy.mongodb.net/orders?retryWrites=true&w=majority';
//const uri = process.env.ATLAS_URI;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open',()=> {
    console.log('MongoDB database connection established successfully');
})


const formRouter = require('./routes/form');
const displayRouter = require('./routes/display');

app.use('/form', formRouter);
app.use('/display', displayRouter);
function handleRedirect(req, res) {
    res.redirect('/form');
  }
app.get('*', handleRedirect);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})