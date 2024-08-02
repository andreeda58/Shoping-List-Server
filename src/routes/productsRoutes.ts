import { Router } from 'express';
import { addNewProduct,addAllProducts} from '../controllers/productsController';

const router = Router();


router.put('/addNewProduct', addNewProduct);
router.put('/addAllProducts',addAllProducts);
export default router;