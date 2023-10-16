const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGOOSE_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Import routes
const userRoutes = require("./src/routes/users");
const authRoutes = require("./src/routes/auth");
const searchRoutes = require("./src/routes/search");
const favoritedRoutes = require("./src/routes/favorited");
const inquiryRoutes = require("./src/routes/inquiry");
const applicationsRoutes = require("./src/routes/admin/applications");

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dog", searchRoutes);
app.use("/api/favorites", favoritedRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/applications", applicationsRoutes);


app.get('/', function(req, res){
    res.send("Server is running");
});


app.listen(0, () => console.log('Application is running'));
// API Routes
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle errors globally
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
