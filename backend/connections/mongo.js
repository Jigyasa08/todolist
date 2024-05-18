const mongoose = require("mongoose");

const init = async () => {
  // Connect to MongoDB
  const mongo = await mongoose.connect(process.env.MONGO, {});
  console.log("Successfully connected to mongodb");
  return mongo;
};

module.exports = init;
