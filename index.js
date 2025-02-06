const express = require("express");
const fs = require("fs");
const app = express();
const users = require("./MOCK_DATA.json");
const PORT = 5000;

// middleware plugin

app.use(express.urlencoded({ extended: false }));

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
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users[userIndex] = { ...users[userIndex], ...req.body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error updating file" });
      return res.json({ status: "updated", user: users[userIndex] });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const filteredUsers = users.filter((user) => user.id !== id);

    if (filteredUsers.length === users.length) {
      return res.status(404).json({ message: "User not found" });
    }

    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(filteredUsers, null, 2),
      (err) => {
        if (err) return res.status(500).json({ error: "Error updating file" });
        return res.json({ status: "deleted", id });
      }
    );
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "pending" });
    console.log(err);
  });
});

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
