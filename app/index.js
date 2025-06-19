const express = require("express");
const mongoose = require("mongoose");
const promClient = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/devopsdb";

// Prometheus metrics
promClient.collectDefaultMetrics();
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Mongoose model
const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemSchema);

app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API endpoints
app.get("/", (req, res) => res.send("DevOps Advanced Project API is running!"));
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});
app.post("/items", async (req, res) => {
  const { name } = req.body;
  const item = new Item({ name });
  await item.save();
  res.status(201).json(item);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing