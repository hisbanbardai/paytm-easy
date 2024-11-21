const express = require("express");
require("dotenv").config();
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
