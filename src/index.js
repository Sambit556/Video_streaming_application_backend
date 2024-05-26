const { dbConnect } = require("../src/db/db.js");
const {app} = require("./app.js")


require("dotenv").config();


const port = process.env.PORT || 8000;


dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is listining on port ${port} 💥💨`);
    });
  })
  .catch(Error, () => {
    console.error("error", Error);
    console.log("express can't started currectly");
  });
