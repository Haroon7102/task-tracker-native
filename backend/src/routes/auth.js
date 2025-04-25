const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");  // ✅ Correct import

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY; // Store in .env

// ✅ Register Route
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // Debugging Logs
        console.log("Checking if user exists...");
        console.log("User Model:", User);

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists!" });
        }

        // Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Registration failed!", details: error.message });
    }
});


// ✅ Login Route with Cookies
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // Find the user by email in MongoDB
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: "User not found!" });

        // Check if the password matches
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(401).json({ error: "Invalid credentials!" });

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        // Send token as a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure only in production
            sameSite: "None",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.json({ message: "Login successful!", token });
        console.log("User logged in successfully")
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed!" });
    }
});


// ✅ Logout Route (Clear Cookie)
router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
    res.json({ message: "Logged out successfully!" });
});

// ✅ Get User Data
router.get("/me", async (req, res) => {
    try {
        console.log("Cookies:", req.cookies);
        console.log("Headers:", req.headers);

        let token = req.cookies?.token || req.headers.authorization || null;

        // Extract token from 'cookie' header if cookie-parser fails
        if (!token && req.headers.cookie) {
            const match = req.headers.cookie.match(/token=([^;]+)/);
            if (match) token = match[1];
        }

        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        res.json({ message: "Token is valid", user: decoded });

    } catch (error) {
        console.error("Token Error:", error);
        res.status(401).json({ error: "Invalid token" });
    }
});

module.exports = router;
