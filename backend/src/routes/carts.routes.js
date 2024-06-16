import { Router } from "express";
import { addCart, deleteCart, getCartById, getCarts, updateCart } from "../controllers/carts.controller.js"
const router = Router()

router.get('/carts', getCarts)
router.get('/carts/:id', getCartById);
router.delete('/carts/:id', deleteCart);
router.post('/carts', addCart);
router.put('/carts/:id', updateCart);

export default router;