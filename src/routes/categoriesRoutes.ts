import { Router } from 'express';
import { getCategories } from '../controllers/categoriesController';

const router = Router();


router.get('/getAllCategories', getCategories);



export default router;
