import express from "express";
import dotenv from "dotenv";
import Router from "./routes/index.routes.js";

dotenv.config();
const port = process.env.PORT 
const app = express();

app.use(express.json());
app.set(express.static("public"));
app.set('view engine', 'ejs');


app.use("/", Router);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});