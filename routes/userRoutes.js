const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users (supports ?search= and ?sort=)
router.get('/', userController.getAllUsers);

// GET a specific user by ID
router.get('/:id', userController.getUserById);

// POST a new user
router.post('/', userController.createUser);

// PUT (Update) an existing user
router.put('/:id', userController.updateUser);

// DELETE a user
router.delete('/:id', userController.deleteUser);

module.exports = router;