const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DB_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log("Database connected successfully");
});

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is running on port: ${PORT}`);
});
