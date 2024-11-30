import { Router } from 'express';
import { verifyToken, authorize } from '../middleware/authMiddleware';
import { createWisata, getAllWisata, updateWisata, deleteWisata } from '../controllers/wisataController';

export const wisataRoutes = Router();

wisataRoutes.post('/', verifyToken, authorize(['admin']), createWisata);
wisataRoutes.get('/', getAllWisata);
wisataRoutes.put('/:id', verifyToken, authorize(['admin']), updateWisata);
wisataRoutes.delete('/:id', verifyToken, authorize(['admin']), deleteWisata);