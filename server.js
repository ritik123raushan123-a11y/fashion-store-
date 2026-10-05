
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve website files
app.use(express.static(__dirname));

// Products API
let products = [];

try {
  products = require("./products.js");
  console.log(`Loaded ${products.length} products`);
} catch (error) {
  console.error("Products loading error:", error);
}

// Product API
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    products: products.length
  });
});

// Fallback to website
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// IMPORTANT: Render needs this
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Fashion Store running on port ${PORT}`);
});
