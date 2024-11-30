import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware';

export const userRoutes = Router();

userRoutes.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  // Simpan pengguna ke database (sederhana untuk contoh)
  const newUser = { id: Date.now(), username, password, role: role || 'member' };
  res.status(201).json(newUser);
});

userRoutes.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Validasi pengguna (misalnya dari database)
  const user = { id: 1, username, role: 'admin' }; // Simulasi data login
  const token = jwt.encode({ id: user.id, role: user.role }, 'secret_key');
  res.json({ token });
});