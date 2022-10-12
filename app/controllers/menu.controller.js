const db = require('../models');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const crypto = require('crypto');
const { Op } = require('sequelize');
const {
  successResponse,
  errorResponse,
} = require('../middleware/responseFormat');

const Menu = db.menu;

const retrieveMenu = (req, res) => {
  Menu.findAll()
    .then((menu) => {
      res.status(200).json(successResponse('OK', menu, res.statusCode));
    })
    .catch((error) => {
      res.status(500).json(errorResponse(error.message, res.statusCode));
    });
};

const menuById = (req, res, next, id) => {
  Menu.findByPk(id)
    .then((menu) => {
      req.activeMenu = menu;
      next();
    })
    .catch((error) => {
      res.status(500).json(errorResponse(error.message, res.statusCode));
    });
};

const getMenuById = (req, res) => {
  if (req.activeMenu) {
    res.status(200).json(successResponse('OK', req.activeMenu, res.statusCode));
  }
  res
    .status(404)
    .json(
      errorResponse('Requested details could not be retrieved', res.statusCode)
    );
};

const createMenu = (req, res) => {
  console.log(req);
  let form = new formidable.IncomingForm();
  console.log(form);
  form.keepExtenstions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res
        .status(400)
        .json(errorResponse('Error while parsing form data.', res.statusCode));
    }
    const menu = Menu.build(fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(400)
          .json(
            errorResponse(
              'Image file too large. Upload file less than 1Mb.',
              res.statusCode
            )
          );
      }

      photo = fs.readFileSync(files.photo.filepath);
      let filename = crypto.randomBytes(4).toString('hex');
      let path = `images/menu-items/${filename}`;
      fs.writeFileSync(path, photo);
      menu.photo = path;
    }
    menu
      .save()
      .then((data) => {
        res.status(201).json(successResponse('OK', data, res.statusCode));
      })
      .catch((error) => {
        res.status(400).json(errorResponse(error.message, res.statusCode));
      });
  });
};

const updateMenu = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtenstions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res
        .status(400)
        .json(errorResponse('Error while parsing form data.', res.statusCode));
    }
    let menu = req.activeMenu;
    menu = _.extend(menu, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(400)
          .json(
            errorResponse(
              'Image file too large. Upload file less than 1Mb.',
              res.statusCode
            )
          );
      }
      photo = fs.readFileSync(files.photo.filepath);
      let filename = crypto.randomBytes(4).toString('hex');
      let path = `images/menu-items/${filename}`;
      fs.writeFileSync(path, photo);
      menu.photo = path;
    }
    menu
      .save()
      .then((data) => {
        res.status(200).json(successResponse('OK', data, res.statusCode));
      })
      .catch((error) => {
        res.status(400).json(errorResponse(error.message, res.statusCode));
      });
  });
};

const deleteMenu = (req, res) => {
  let menu = req.activeMenu;
  let imagePath = menu.photo;
  menu
    .destroy()
    .then((data) => {
      fs.unlinkSync(imagePath);
      return res
        .status(200)
        .json(
          successResponse(
            'Menu Item deleted successfully',
            data,
            res.statusCode
          )
        );
    })
    .catch((error) => {
      return res.status(400).json(errorResponse(error.message, res.statusCode));
    });
};

const menuByDishType = (req, res) => {
  const dishType = req.query['dishType'];
  console.log('Dish Type', dishType);
  Menu.findAll({ where: { dish_type: { [Op.eq]: dishType } } })
    .then((menuItems) => {
      console.log('Menu Items', menuItems);
      return res
        .status(200)
        .json(successResponse('OK', menuItems, res.statusCode));
    })
    .catch((error) => {
      return res.status(400).json(errorResponse(error.message, res.statusCode));
    });
};

module.exports = {
  retrieveMenu,
  getMenuById,
  createMenu,
  menuById,
  updateMenu,
  deleteMenu,
  menuByDishType,
};
