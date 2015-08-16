'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var WishSchema = new Schema({
  name: String
});

WishSchema.plugin(timestamps);

WishSchema.index({ name: 'text' , user: 'text' });

module.exports = mongoose.model('Wish', WishSchema);