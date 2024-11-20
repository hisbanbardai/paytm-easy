const express = require("express");
require("dotenv").config();
require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
