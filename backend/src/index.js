import express from 'express';
import ProductsRoutes from "./routes/products.routes.js";
import CartsRoutes from "./routes/carts.routes.js";

const app = express();
app.use(express.json());

app.use(ProductsRoutes);
app.use(CartsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
