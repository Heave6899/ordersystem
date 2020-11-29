const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    topic:String,
    v1: String,
    v2: String,
    v3: String,
    i1: String,
    i2: String,
    i3: String
}, {
    timestamps: true
});

const data = mongoose.model('dataall', dataSchema);

module.exports = data;