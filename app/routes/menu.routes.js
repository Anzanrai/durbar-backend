const express = require('express');
const { verifyToken, userById, isAdmin } = require('../middleware/authJwt');
const {
  retrieveMenu,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenuById,
  menuById,
  menuByDishType,
} = require('../controllers/menu.controller');

const router = express.Router();

router.get('/', retrieveMenu);
router.get('/by-dish-type/', menuByDishType);
router.get('/:menuId', getMenuById);
router.post('/:userId', verifyToken, isAdmin, createMenu);
router.put('/:userId/:menuId', verifyToken, isAdmin, updateMenu);
router.delete('/:userId/:menuId', verifyToken, isAdmin, deleteMenu);

router.param('userId', userById);
router.param('menuId', menuById);
module.exports = router;
