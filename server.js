import bodyparser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import database from "./app/config/db";
import usersRoutes from "./app/routes/UsersRoutes";
import beritaRoutes from "./app/routes/BeritaRoutes";

const app = express();



const db = database.url;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
  
var corsOptions = {
    origin: "http://localhost:3200"
};

app.use(cors(corsOptions));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/users", usersRoutes);
app.use("/api/berita", beritaRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Sportnews REST API" });
});


const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});