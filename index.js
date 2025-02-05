const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const PORT = 5000;

// Routes
app.get("/users", (req, res) => {
  return res.json(users);
});

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
