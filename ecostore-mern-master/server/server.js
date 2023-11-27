import errorHandler from "./Handlers/errorHandler.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import categoryRoute from "./routes/category.js";
import savedRoute from "./routes/saved.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";

dotenv.config();
// Define vars
const app = express();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3001;

// Init middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(
  session({
    key: "jwt",
    secret: "test",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: MongoStore.create({
      mongoUrl: DB_URL,
      dbName: "ecoshop",
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 3600000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/saved", savedRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.use(errorHandler);

// Handle database and server app in running
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT);
  })
  .catch((e) => {
    console.log("Cannot connect to the database!");
  });
