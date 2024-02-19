import express from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongodb from "mongodb";
import cors from 'cors';
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import empsRouter from "./routes/employees";
import authempsRouter from "./routes/authemps";

dotenv.config({
  path: path.join(__dirname, ".env")
});

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoUrl = process.env.DB_CONNECTION;

mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true })
  .then(client => {
    const db = client.db(process.env.DB_NAME);
    app.set("db", db);

    app.use("/api/users", usersRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/emps", empsRouter);
    app.use("/api/authemps", authempsRouter);

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "./index.html"));
    });

    app.get("/api/test", (req, res) => {
      res.json({ mes: "Hello from express" });
    });

    app.listen(port, () => console.log(`Running on localhost:${port}`));
  })
  .catch(err => console.log("Error connecting to database", err));
