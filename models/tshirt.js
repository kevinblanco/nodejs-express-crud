/**
 * Tshirt
 *
 * @module      :: Model
 * @description :: Represent data model for the Tshirts
 * @author		  :: Kevin Blanco
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Tshirt = new Schema({

  model:    {
    type    : String,
    require : true
  },
  style:    {
    type    : String,
    enum    :  ['Casual', 'Vintage', 'Alternative'],
    require : true
  },
  size:     {
    type    : Number,
    enum    : [36, 38, 40, 42, 44, 46],
    require : true
  },
  color:   {
    type: String
  },
  price :   {
    type    : Number,
    require : true
  },
  modified: {
    type    : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('Tshirt', Tshirt);