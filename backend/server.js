const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//apis for registering a new user

app.use("/auth", require("./src/routes/auth"));

// apis for adding deleting the task
app.use('/api/tasks', require('./src/routes/task'));

// enabling cookie parser
app.use(cookieParser()); // Enable parsing cookies

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT} 🚀`));
