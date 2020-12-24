import bodyparser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

var corsOptions = {
    origin: "http://localhost:3200"
};

app.use(cors(corsOptions));

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Sportnews REST API" });
});


const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});