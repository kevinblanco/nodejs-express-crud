/**
 * Tshirt
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author		  :: Kevin Blanco
 */

var Tshirt = require('../models/tshirt.js');

module.exports = function(app) {


  /**
   * Find and retrieves all tshirts
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllTshirts = function(req, res) {
    console.log("GET - /tshirts");
    return Tshirt.find(function(err, tshirts) {
      if(!err) {
        return res.send(tshirts);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };



  /**
   * Find and retrieves a single tshirt by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findById = function(req, res) {

    console.log("GET - /tshirt/:id");
    return Tshirt.findById(req.params.id, function(err, tshirt) {

      if(!tshirt) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send({ status: 'OK', tshirt:tshirt });
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };




  /**
   * Creates a new tshirt from the data request
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  addTshirt = function(req, res) {

    console.log('POST - /tshirt');

    var tshirt = new Tshirt({
      model:    req.body.model,
      style:    req.body.style,
      size :    req.body.size,
      color:    req.body.color,
      price:    req.body.price
    });

    tshirt.save(function(err) {

      if(err) {

        console.log('Error while saving tshirt: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("Tshirt created");
        return res.send({ status: 'OK', tshirt:tshirt });

      }

    });

  };



  /**
   * Update a tshirt by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updateTshirt = function(req, res) {

    console.log("PUT - /tshirt/:id");
    return Tshirt.findById(req.params.id, function(err, tshirt) {

      if(!tshirt) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.model != null) tshirt.model = req.body.model;
      if (req.body.price != null) tshirt.price = req.body.price;
      if (req.body.style != null) tshirt.style = req.body.style;
      if (req.body.size != null) tshirt.size  = req.body.size;
      if (req.body.colour != null) tshirt.color = req.body.color;

      return tshirt.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', tshirt:tshirt });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(tshirt);

      });
    });
  };



  /**
   * Delete a tshirt by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deleteTshirt = function(req, res) {

    console.log("DELETE - /tshirt/:id");
    return Tshirt.findById(req.params.id, function(err, tshirt) {
      if(!tshirt) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return tshirt.remove(function(err) {
        if(!err) {
          console.log('Removed tshirt');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }

  //Link routes and actions
  app.get('/tshirt', findAllTshirts);
  app.get('/tshirt/:id', findById);
  app.post('/tshirt', addTshirt);
  app.put('/tshirt/:id', updateTshirt);
  app.delete('/tshirt/:id', deleteTshirt);

}