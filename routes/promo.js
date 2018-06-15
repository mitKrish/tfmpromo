var express = require('express');
var router = express.Router();

var promo_controller = require('../controllers/promoController');

router.get('/', promo_controller.index);

//Create Promo
router.get('/promo/create', promo_controller.promo_create_get);
router.post('/promo/create', promo_controller.promo_create_post);

//List Promo
router.get('/promo/:id', promo_controller.promo_detail);
router.get('/promos', promo_controller.promo_list);

//Update Promo
router.get('/promo/:id/update', promo_controller.promo_update_get);
router.post('/promo/:id/update', promo_controller.promo_update_post);

//Delete Promo
router.get('/promo/:id/delete', promo_controller.promo_delete_get);
router.post('/promo/:id/delete', promo_controller.promo_delete_post);

//Export & Import CSV
router.get('/exporttocsv', promo_controller.export_to_csv);
router.get('/importfromcsv', promo_controller.import_from_csv);

//importinvoice
router.get('/importinvoice', promo_controller.import_from_invoice);

module.exports = router;
