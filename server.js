const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

var corsOptions = {
  origin: 'http://localhost:8000',
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require('./app/models');
const Role = db.role;
const User = db.user;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

// routes
app.use('/api/auth', require('./app/routes/auth.routes'));
// require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);
app.use('/api/menu', require('./app/routes/menu.routes'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: 'admin',
  });

  Role.create({
    id: 2,
    name: 'staff',
  });

  Role.create({
    id: 3,
    name: 'customer',
  });

  let user = User.build({
    id: 1,
    username: 'root',
    email: 'root@root.com',
    password: bcrypt.hashSync('admin'),
  });
  user.setRoles([1]);
  user.save();
}

// initial();
