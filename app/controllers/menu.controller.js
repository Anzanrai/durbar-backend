const db = require('../models');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const crypto = require('crypto');

const Menu = db.menu;

const retrieveMenu = (req, res) => {
  Menu.findAll()
    .then((menu) => {
      res.status(200).send({
        data: menu,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

const menuById = (req, res, next, id) => {
  Menu.findByPk(id)
    .then((menu) => {
      req.activeMenu = menu;
      next();
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

const getMenuById = (req, res) => {
  if (req.activeMenu) {
    res.status(200).send({ data: req.activeMenu });
  }
  res.status(404).send({ message: 'Requested details cannot be retrieved.' });
};

const createMenu = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtenstions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded.',
      });
    }
    const menu = Menu.build(fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).send({
          message: 'Image file too large. Upload file less than 1Mb.',
        });
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
        res.status(201).send({
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error.message });
      });
  });
};

const updateMenu = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtenstions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded.',
      });
    }
    let menu = req.activeMenu;
    menu = _.extend(menu, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image file too large. Upload file less than 1Mb.',
        });
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
        res.status(200).send({
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error.message });
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
        .send({ message: 'Menu Item deleted successfully' });
    })
    .catch((error) => {
      return res.status(400).send({
        message: 'Something went wrong. Could not delete the menu-item',
      });
    });
};

module.exports = {
  retrieveMenu,
  getMenuById,
  createMenu,
  menuById,
  updateMenu,
  deleteMenu,
};
