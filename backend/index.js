const express = require("express");
require("dotenv").config();
require("cors");
const rootRouter = require("./routes/index");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/v1", rootRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
