const express = require('express');
const menuController = require('./../controllers/menuController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/top-5-best-menus')
  .get(menuController.aliasRoute, menuController.getAllMenu);
router.route('/stats').get(menuController.getMenuStats);
router
  .route('/')
  .get(authController.protected, menuController.getAllMenu)
  .post(menuController.createNewMenu);

router
  .route('/:id')
  .get(menuController.getMenu)
  .patch(menuController.updateMenu)
  .delete(menuController.deleteMenu);

module.exports = router;
