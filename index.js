const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const PORT = 5000;

// Routes

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => ` <li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    res.json({ status: "pending" });
  })
  .delete((req, res) => {});

app.post("/api/users", (req, res) => {});

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
