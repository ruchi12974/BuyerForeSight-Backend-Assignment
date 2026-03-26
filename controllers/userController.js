const db = require('../db/database');

// GET /users (List with Search and Sort)
exports.getAllUsers = (req, res) => {
  const { search, sort, order = 'asc' } = req.query;
  let query = "SELECT * FROM users";
  let params = [];

  if (search) {
    query += " WHERE name LIKE ? OR email LIKE ?";
    params.push(`%${search}%`, `%${search}%`);
  }

  if (sort) {
    const validColumns = ['name', 'email', 'id'];
    if (validColumns.includes(sort)) {
      query += ` ORDER BY ${sort} ${order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'}`;
    }
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET /users/:id (Get single user)
exports.getUserById = (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "User not found" });
    res.json(row);
  });
};

// POST /users (Create user)
exports.createUser = (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }
  const sql = 'INSERT INTO users (name, email, role) VALUES (?, ?, ?)';
  db.run(sql, [name, email, role], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, email, role });
  });
};

// PUT /users/:id (Update user)
exports.updateUser = (req, res) => {
  const { name, email, role } = req.body;
  const sql = `UPDATE users SET 
               name = COALESCE(?, name), 
               email = COALESCE(?, email), 
               role = COALESCE(?, role) 
               WHERE id = ?`;
  
  db.run(sql, [name, email, role, req.params.id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully", id: req.params.id });
  });
};

// DELETE /users/:id (Delete user)
exports.deleteUser = (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.run(sql, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  });
};