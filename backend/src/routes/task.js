const express = require('express');
const Task = require('../models/Task,');
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Add a new task
router.post('/', async (req, res) => {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.json(newTask);
});

// Update a task
router.put('/:id', async (req, res) => {
    const { title, completed } = req.body;
    console.log("title: ", title)
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, completed }, { new: true });
    res.json(updatedTask);
});

// Delete a task
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || id.length !== 24) {  // MongoDB ObjectId is 24 characters long
        return res.status(400).json({ error: "Invalid ID provided" });
    }

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});
router.get("/tasks/upcoming", async (req, res) => {
    try {
        const now = new Date();
        const upcomingTasks = await Task.find({ scheduledDate: { $gte: now } });
        res.status(200).json(upcomingTasks);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});


module.exports = router;
