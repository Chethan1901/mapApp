import express from "express";
import config from "config";
import "./dbConnect.js"
import apiRouter from "./controllers/api/index.js";
import locationRouter from "./controllers/location/index.js";

const app = express();
const port = config.get("PORT");

//APP LEVEL MIDDLE WARE
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ success: "This is mapApp" });
})

app.use("/api", apiRouter);
app.use("/api/location", locationRouter);


app.listen(port, () => {
    console.log("Server Started at Port : ", port);
})