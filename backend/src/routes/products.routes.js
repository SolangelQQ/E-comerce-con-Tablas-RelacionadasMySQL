import { Router } from "express";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/products.controller.js"
const router = Router()

router.get('/products', getProducts)
router.get('/products/:id', getProductById);
router.delete('/products/:id', deleteProduct);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);

export default router;