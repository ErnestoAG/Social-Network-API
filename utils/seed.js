const connection = require('../config/connection');
const { user } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

  const users = [{username: "Ernesto Gonzalez", email: "ernestoale37@gmail.com"}, {username: "Eileen Schneider", email: "elee87@gmail.com"}, {username: "Isabel Douglas", email: "idogles33@gmail.com"}, {username: "Walter White", email: "heisenbergian23@gmail.com"}];

  const userData = await user.create(users);

  console.table(users);
  process.exit(0);
});
