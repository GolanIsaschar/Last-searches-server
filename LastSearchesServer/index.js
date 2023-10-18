const express = require("express");
const connectDB = require("./config/db");
const searchesRouter = require("./routers/searchesRouter");
const PORT = require("./globals").PORT;

const app = express();

connectDB();

app.use(express.json());

app.use(searchesRouter);

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
