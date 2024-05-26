const mongoose = require("mongoose");

const { dataBaseName } = require("../constraints.js");

require("dotenv").config();

const dbConnect = async () => {
  try {
    const isConnect = await mongoose.connect(
      `${process.env.MONGODB_URI}/${dataBaseName}`
    );
    console.log(`dataBase connect Successfully`);
    console.log(isConnect.connection.host); // ac-tjzxqva-shard-00-01.wryqghc.mongodb.net
  } catch (error) {
    console.error("error", error);
    // throw error
    process.exit(1);
  }
};

// export default dbConnect
// module.exports.dbConnect=dbConnect;       // 4 way of export the files
// exports.dbConnect=dbConnect;
// export {dbConnect }
module.exports = {
  dbConnect,
};
