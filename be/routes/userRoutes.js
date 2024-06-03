import { Router } from 'express';
import { createUser, checkUserPassword, getUser } from '../controllers/userController';

const router = Router();

router.post('/create', createUser);
router.post('/login', checkUserPassword);
router.get('/:id', getUser);

export default router;
