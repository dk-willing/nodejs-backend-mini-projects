const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const Menu = require("./../model/Menu");

dotenv.config({ path: "./config.env" });

const DB = process.env.DB_CONN_STR.replace(
  "<db_password>",
  process.env.DB_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log("Database connected sucessfully from script");
});

const menus = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/menu.json`, "utf-8"),
);

const command = process.argv[2];

const deleteData = async () => {
  try {
    await Menu.deleteMany();
    console.log("Data deleted successfully");
  } catch (err) {
    console.log(`ERROR DELETING DATA 💥: ${err.message}`);
  } finally {
    process.exit();
  }
};

const importData = async () => {
  try {
    await Menu.insertMany(menus);
    console.log("Data imported successfully");
  } catch (err) {
    console.log(`ERROR IMPORTING DATA💥: ${err.message}`);
  } finally {
    process.exit();
  }
};

if (command === "-d" || command === "--delete") {
  deleteData();
}

if (command === "-i" || command === "--import") {
  importData();
}
