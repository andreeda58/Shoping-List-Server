import { Router } from 'express';
import { addNewProduct,getProductById, getProductsByCategoryId ,updateProductQuantity,addAllProducts} from '../controllers/productsController';

const router = Router();


router.put('/addNewProduct', addNewProduct);
router.get('/getProductById/:id',getProductById);
router.get('/getProductsByCategoryId/:categoryId',getProductsByCategoryId);
router.put('/updateProductQuantity', updateProductQuantity);
router.put('/addAllProducts',addAllProducts);
export default router;