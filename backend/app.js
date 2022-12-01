// external imports
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
// const moment = require("moment");
const http = require("http");
const path = require("path");

// internal imports
const loginRouter = require("./router/loginRouter");
// const usersRouter = require("./router/usersRouter");
// const inboxRouter = require("./router/inboxRouter");
// const {
//   notFoundHandler,
//   errorHandler,
// } = require("./middlewares/common/errorHandler");

const app = express();
const server = http.createServer(app);
dotenv.config();

// socket creation
// const io = require("socket.io")(server);
// global.io = io;

// set moment as app locals
// app.locals.moment = moment;

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
// app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
// app.use("/users", usersRouter);
// app.use("/inbox", inboxRouter);

// 404 not found handler
// app.use(notFoundHandler);

// common error handler
// app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`app listening to port ${process.env.PORT}`);
});
