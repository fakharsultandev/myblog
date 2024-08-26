require("dotenv").config();

/***************************************************************/
//  MongoDB Connection 

const connectToMongoDB = require("./config/mongoConnection");

const { MONGODB_URI, PORT } = process.env;
connectToMongoDB(MONGODB_URI)
  .then((res) => console.log("MongoDB Connected Successfully"))
  .catch((e) => console.log("Connection Failed: ".concat(e)));

/****************************************************************/


const path = require("path");
const cors = require("cors");
const express = require("express");
const { default: helmet } = require("helmet");

const userRoutes = require("./routes/userRoutes");
const pagesRoutes = require("./routes/pageRouter");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views/pages"));

// package middlewares
// app.use(cors());
// app.use(helmet());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRoutes);
app.use("/", pagesRoutes);


app.listen(PORT, () => {
  console.log("App running on http://localhost:" + PORT);
})


module.exports = app;