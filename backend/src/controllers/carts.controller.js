import { pool } from "../db.js";

export const getCarts = async (req, res) => {
    const result = await pool.query('SELECT * FROM carts');
    res.send(result[0]);
};

export const getCart_items = async (req, res) => {
    const result = await pool.query('SELECT * FROM cart_items');
    res.send(result[0]);
};

export const getCartById = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM carts WHERE id = ?', [id]);
    const productsResult = await pool.query('SELECT * FROM cart_products WHERE cartrId = ?', [id]);
    res.send({ ...result[0][0], products: productsResult[0] });
};

export const addCart = async (req, res) => {
    try {
        const { date, products } = req.body;

        // Verificar la estructura de req.body y productos
        console.log('Request body:', req.body);
        
        if (!date) {
            return res.status(400).json({ error: 'Date is required' });
        }

        if (!Array.isArray(products) || products.length === 0) {
            // Insertar el carrito sin productos
            const result = await pool.query(
                'INSERT INTO carts (date) VALUES (?)',
                [date]
            );
            const cartId = result[0].insertId;
            console.log('New cart ID:', cartId);

            return res.status(201).json({ id: cartId, date });
        }

        // Insertar el carrito y los productos
        const result = await pool.query(
            'INSERT INTO carts (date) VALUES (?)',
            [date]
        );
        const cartId = result[0].insertId;
        console.log('New cart ID:', cartId);

        const productPromises = products.map(async product => {
            if (product.productId && product.quantity) {
                await pool.query(
                    'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
                    [cartId, product.productId, product.quantity]
                );
            } else {
                console.error('Invalid product structure:', product);
            }
        });

        await Promise.all(productPromises);

        res.status(201).json({ id: cartId, ...req.body });
    } catch (error) {
        console.error('Error adding cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateCart = async (req, res) => {
    const { id } = req.params;
    const { userId, date, products } = req.body;
    await pool.query(
        'UPDATE cart SET userId = ?, date = ? WHERE id = ?',
        [userId, date, id]
    );
    await pool.query('DELETE FROM cart_products WHERE cartId = ?', [id]);
    const productPromises = products.map(product =>
        pool.query(
            'INSERT INTO cart_products (cartId, productId, quantity) VALUES (?, ?, ?)',
            [id, product.productId, product.quantity]
        )
    );
    await Promise.all(productPromises);
    res.send({ id, ...req.body });
};

export const deleteCart = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM carts WHERE id = ?', [id]);
    await pool.query('DELETE FROM cart_products WHERE cartId = ?', [id]);
    res.send({ message: 'Cart deleted' });
};
