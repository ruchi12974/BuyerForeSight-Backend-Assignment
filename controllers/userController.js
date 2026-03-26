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

  try {
    const rows = db.prepare(query).all(...params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /users/:id (Get single user)
exports.getUserById = (req, res) => {
  try {
    const row = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
    if (!row) return res.status(404).json({ message: "User not found" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /users (Create user)
exports.createUser = (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }

  try {
    const info = db.prepare('INSERT INTO users (name, email, role) VALUES (?, ?, ?)')
                   .run(name, email, role);
    res.status(201).json({ 
      id: info.lastInsertRowid, 
      name, 
      email, 
      role 
    });
  } catch (err) {
    // Handle unique constraint error for email
    res.status(400).json({ error: err.message });
  }
};

// PUT /users/:id (Update user)
exports.updateUser = (req, res) => {
  const { name, email, role } = req.body;
  
  try {
    // We use COALESCE so that if a field isn't provided, it keeps the old value
    const sql = `
      UPDATE users SET 
      name = COALESCE(?, name), 
      email = COALESCE(?, email), 
      role = COALESCE(?, role) 
      WHERE id = ?
    `;
    
    const info = db.prepare(sql).run(name, email, role, req.params.id);
    
    if (info.changes === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "User updated successfully", id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /users/:id (Delete user)
exports.deleteUser = (req, res) => {
  try {
    const info = db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
    
    if (info.changes === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};