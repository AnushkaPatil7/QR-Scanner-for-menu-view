const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// Your menu data
const menuData = {
  restaurant: "Tasty Bites",
  menu: [
    { id: 1, name: "Margherita Pizza", price: "$12" },
    { id: 2, name: "Pasta Alfredo", price: "$10" },
    { id: 3, name: "Cheeseburger", price: "$8" },
    { id: 4, name: "Caesar Salad", price: "$7" },
    {id: 5, name: "Coffee", price:"$1"}
  ]
};

// Serve the menu as a clean HTML page
app.get("/menu", (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>${menuData.restaurant} Menu</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #f9f9f9;
      }
      .menu-card {
        background: white;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      h1 {
        color: #e74c3c;
        text-align: center;
        margin-top: 0;
      }
      .menu-item {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px dashed #eee;
      }
      .price {
        color: #27ae60;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="menu-card">
      <h1>${menuData.restaurant}</h1>
  `;

  // Add each menu item
  menuData.menu.forEach(item => {
    html += `
      <div class="menu-item">
        <span>${item.name}</span>
        <span class="price">${item.price}</span>
      </div>
    `;
  });

  html += `
    </div>
  </body>
  </html>
  `;

  res.send(html);
});

// QR code generation endpoint (optional)
app.get("/generate-qr", (req, res) => {
  res.json({
    qrUrl: "http://your-local-ip:5000/menu", // Replace with your actual IP
    menuUrl: "/menu"
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Menu: http://localhost:${PORT}/menu`);
});