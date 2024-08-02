import { Router } from 'express';
import { saveShoppingList } from '../controllers/shoppinglistsController';

const router = Router();

router.put('/saveShoppingList', saveShoppingList);

export default router;
