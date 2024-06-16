import { express } from "express";
import ProductsRoutes from "./routes/products.routes.js"
import CartsRoutes from "./routes/carts.routes.js"
const app = express();
app.use(ProductsRoutes)
app.use(CartsRoutes)
app.listen(3000);
console.log('Server running on port 3000')