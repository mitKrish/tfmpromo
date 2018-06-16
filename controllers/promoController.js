var Promotion = require('../models/promotion');
var Product = require('../models/product');
var Payment = require('../models/payment');

var async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var csv = require('csv-express');
var csvimp = require('fast-csv');
var session = require('express-session');
var flash = require('connect-flash');
var fs = require('fs');
var csvfile = __dirname + '/../public/files/product.csv';
var stream = fs.createReadStream(csvfile);
var invoicefile = __dirname + '/../public/files/invoice.csv';
var invoicestream = fs.createReadStream(invoicefile);

exports.promo_list = function(req, res, next) {
  Promotion.find()
    //  .sort([['promo_id', 'ascending']])
    .exec(function(err, list_promos) {
      if (err) {
        return next(err);
      }
      /*  if (list_promo == null) {
        var err = new Error('No Promotions');
        err.status = 404;
        return next(err);
      }*/
      res.render('promo_list', {
        title: 'Promotion List',
        promo_list: list_promos
      });
    });
};

exports.promo_detail = function(req, res, next) {
  Promotion.findById(req.params.id).exec(function(err, results) {
    if (err) {
      return next(err);
    }
    res.render('promo_detail', {
      title: 'Promotion Detail',
      promo_detail: results
    });
  });
};

exports.promo_create_get = function(req, res, next) {
  res.render('promo_form', { title: 'Create New Promotion' });
};

exports.promo_create_post = [
  body('promo_id')
    .isLength({ min: 1 })
    .trim()
    .withMessage(' be specified')
    .isAlphanumeric()
    .withMessage(' has Non-Alphanumeric Characters'),

  body('planning_account')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Planning Account must be specified')
    .isAlphanumeric()
    .withMessage(' Planning Account has Non-Alphanumeric Characters'),

  body('funding_account')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Funding Account must be specified')
    .isAlphanumeric()
    .withMessage('Funding Account has Non-Alphanumeric Characters'),

  body('brand')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Brand must be specified')
    .isAlphanumeric()
    .withMessage('Brand has Non-Alphanumeric Characters'),

  body('sub_brand')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Sub-Brand must be specified')
    .isAlphanumeric()
    .withMessage('Sub-Brand has Non-Alphanumeric Characters'),

  body('discount')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Discount must be specified')
    .isAlphanumeric()
    .withMessage('Discount has Non-Alphanumeric Characters'),

  body('acc_mgr_status')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Account Manager Status be specified')
    .isAlphanumeric()
    .withMessage('Account Manager Status has Non-Alphanumeric Characters'),

  body('mo_status')
    .isLength({ min: 1 })
    .trim()
    .withMessage('MO Status must be specified')
    .isAlphanumeric()
    .withMessage('MO Status has Non-Alphanumeric Characters'),

  sanitizeBody('promo_id')
    .trim()
    .escape(),

  sanitizeBody('planning_account')
    .trim()
    .escape(),

  sanitizeBody('funding_account')
    .trim()
    .escape(),

  sanitizeBody('brand')
    .trim()
    .escape(),

  sanitizeBody('sub_brand')
    .trim()
    .escape(),

  sanitizeBody('discount')
    .trim()
    .escape(),

  sanitizeBody('acc_mgr_status')
    .trim()
    .escape(),

  sanitizeBody('mo_status')
    .trim()
    .escape(),

  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('promo_form', {
        title: 'Create New Promo',
        promotion: req.body,
        errors: errors.array()
      });
      return;
    } else {
      var promo = new Promotion({
        promo_id: req.body.promo_id,
        planning_account: req.body.planning_account,
        funding_account: req.body.funding_account,
        brand: req.body.brand,
        sub_brand: req.body.sub_brand,
        discount: req.body.discount,
        acc_mgr_status: req.body.acc_mgr_status,
        mo_status: req.body.mo_status
      });
      promo.save(function(err) {
        if (err) {
          return next(err);
        }
        res.send('uploaded Successfully');
      });
    }
  }
];

exports.index = (req, res, next) => {
  res.render('index', { title: 'Promotions' });
};

exports.promo_update_get = function(req, res, next) {
  Promotion.findById(req.params.id).exec(function(err, results) {
    if (err) {
      return next(err);
    }
    if (results == null) {
      var err = new Error('Promotion Not Found');
      err.status = 404;
      return next(err);
    }
    res.render('promo_form', {
      title: 'Update Promotion',
      promotion: results
    });
  });
};

exports.promo_update_post = [
  body('promo_id')
    .isLength({ min: 1 })
    .trim()
    .withMessage(' be specified')
    .isAlphanumeric()
    .withMessage(' has Non-Alphanumeric Characters'),

  body('planning_account')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Planning Account must be specified')
    .isAlphanumeric()
    .withMessage(' Planning Account has Non-Alphanumeric Characters'),

  body('funding_account')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Funding Account must be specified')
    .isAlphanumeric()
    .withMessage('Funding Account has Non-Alphanumeric Characters'),

  body('brand')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Brand must be specified')
    .isAlphanumeric()
    .withMessage('Brand has Non-Alphanumeric Characters'),

  body('sub_brand')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Sub-Brand must be specified')
    .isAlphanumeric()
    .withMessage('Sub-Brand has Non-Alphanumeric Characters'),

  body('discount')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Discount must be specified')
    .isAlphanumeric()
    .withMessage('Discount has Non-Alphanumeric Characters'),

  body('acc_mgr_status')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Account Manager Status be specified')
    .isAlphanumeric()
    .withMessage('Account Manager Status has Non-Alphanumeric Characters'),

  body('mo_status')
    .isLength({ min: 1 })
    .trim()
    .withMessage('MO Status must be specified')
    .isAlphanumeric()
    .withMessage('MO Status has Non-Alphanumeric Characters'),

  sanitizeBody('promo_id')
    .trim()
    .escape(),

  sanitizeBody('planning_account')
    .trim()
    .escape(),

  sanitizeBody('funding_account')
    .trim()
    .escape(),

  sanitizeBody('brand')
    .trim()
    .escape(),

  sanitizeBody('sub_brand')
    .trim()
    .escape(),

  sanitizeBody('discount')
    .trim()
    .escape(),

  sanitizeBody('acc_mgr_status')
    .trim()
    .escape(),

  sanitizeBody('mo_status')
    .trim()
    .escape(),

  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('promo_form', {
        title: 'Create New Promo',
        promotion: req.body,
        errors: errors.array()
      });
      return;
    } else {
      var promo = new Promotion({
        promo_id: req.body.promo_id,
        planning_account: req.body.planning_account,
        funding_account: req.body.funding_account,
        brand: req.body.brand,
        sub_brand: req.body.sub_brand,
        discount: req.body.discount,
        acc_mgr_status: req.body.acc_mgr_status,
        mo_status: req.body.mo_status,
        _id: req.params.id
      });
      Promotion.findByIdAndUpdate(req.params.id, promo, {}, function(
        err,
        thepromo
      ) {
        if (err) {
          return next(err);
        }
        res.redirect(thepromo.url);
      });
    }
  }
];

exports.promo_delete_get = function(req, res, next) {
  Promotion.findById(req.params.id).exec(function(err, results) {
    if (err) {
      return next(err);
    }
    if (results == null) {
      res.redirect('/promo/promos');
    }
    res.render('promo_delete', {
      title: 'Delete Promotion',
      promo_delete: results
    });
  });
};

exports.promo_delete_post = function(req, res, next) {
  Promotion.findById(req.body.id).exec(function(err, results) {
    if (err) {
      return next(err);
    }
    if (results.length > 0) {
      res.render('promo_delete', {
        title: 'Delete Promotion',
        promo_delete: results
      });
      return;
    } else {
      Promotion.findByIdAndRemove(req.body.id, function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/tfm/promos');
      });
    }
  });
};

exports.export_to_csv = function(req, res, next) {
  var fileName = 'promotion_list.csv';
  var dataArray;

  Promotion.find()
    .lean()
    .exec({}, function(err, promos) {
      if (err) {
        return next(err);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment;filename=' + fileName);
      res.csv(promos, true);
    });
};

exports.import_from_csv = function(req, res, next) {
  var products = [];
  var csvStream = csvimp()
    .on('data', function(data) {
      var item = new Product({
        total_products: data[0],
        category: data[1],
        segment: data[2],
        brand: data[3],
        sub_brand: data[4],
        device_type: data[5]
      });
      item.save(function(err) {
        if (err) {
          return next(err);
        }
        console.log(item);
      });
    })
    .on('end', function() {
      console.log('End of File Import');
    });
  stream.pipe(csvStream);
  res.redirect('/tfm');
};

exports.import_from_invoice = function(req, res, next) {
  var invoice = [];
  var csvStream = csvimp()
    .on('data', function(data) {
      var item = new Payment({
        invoice_id: data[0],
        sap_doc_id: data[1],
        customer_name: data[2],
        amount_paid: data[3],
        promo_id: data[4],
        date: data[5],
        match: data[6]
      });
      item.save(function(err) {
        if (err) {
          return next(err);
        }
      });
    })
    .on('end', function() {
      console.log('End of Invoice Import');
    });
  invoicestream.pipe(csvStream);
  res.redirect('/tfm');
};
