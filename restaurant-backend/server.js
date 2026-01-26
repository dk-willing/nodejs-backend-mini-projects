const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.error(`ERROR NAME : ${err.name}`);
  console.error(`ERROR MESSAE : ${err.message}`);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DB_CONN_STR.replace(
  '<db_password>',
  process.env.DB_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('Database connected successfully');
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port: ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`ERROR NAME : ${err.name}`);
  console.error(`ERROR MESSAE : ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
