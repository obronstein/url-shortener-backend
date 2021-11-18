const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require('cors');
app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
const database = mongoose.connection;

database.on("error", err => console.log(err));
database.once("open", () => console.log("Database connected."));

app.use(express.json());

const urlsRouter = require("./routes/urls");
app.use("/", urlsRouter);

app.listen(process.env.PORT, () => 
	console.log(`Listening on port ${process.env.PORT}`)
);