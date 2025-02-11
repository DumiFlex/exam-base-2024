import bcrypt from "bcrypt";
import fs from "fs/promises";

const dbPath = "./db.sqlite";

const preloadData = async (models) => {
  await models.User.create({
    email: "andrei@nowhere.net",
    passwordHash: await bcrypt.hash("welcome", 10),
    type: "regular",
  });
  await models.User.create({
    email: "andrei@somewhere.net",
    passwordHash: await bcrypt.hash("welcome", 10),
    type: "regular",
  });
  await models.User.create({
    email: "andrei@admin.net",
    passwordHash: await bcrypt.hash("welcome", 10),
    type: "admin",
  });
};

const deleteDatabaseAndPreload = async () => {
  try {
    console.log("Deleting database file...");
    await fs.unlink(dbPath);
    console.log("Database file deleted");

    // Now import models AFTER deleting the database file
    const models = (await import("./models/index.mjs")).default;

    await preloadData(models);
    console.log("Database preloaded successfully.");
  } catch (error) {
    console.error("Error deleting database:", error);
  }
};

deleteDatabaseAndPreload();
