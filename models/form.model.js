const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    party: String,
    date: Date,
    size: String,
    other: String,
    type1: String,
    type2: String,
    box: Number,
    checked: Boolean
}, {
    timestamps: true
});

const form = mongoose.model('form', formSchema);

module.exports = form;