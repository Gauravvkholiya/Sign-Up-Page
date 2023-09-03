const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/portfolioUsers", {
    useNewUrlParser: true, //we write this show that we dont get the deprecation warning
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection succefull`); //if promise is true
  })
  .catch((e) => {
    console.log(e);
  });
