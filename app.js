require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

//DB connection
const url = process.env.MONGO_URL;
const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
  .then( () => {
      console.log('Connected to database ')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. \n${err}`);
  })

// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("DB connected");
//   });

//Middleware
app.use(bodyParser.json());

//My Routes
app.use("/api", userRoutes);

//PORT
const port = process.env.PORT;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
