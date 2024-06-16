import { pool } from "../db.js";

export const getCarts = async (req, res) => {
    const result = await pool.query('SELECT * FROM carts');
    res.send(result[0]);
};

export const getCartById = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM carts WHERE id = ?', [id]);
    const productsResult = await pool.query('SELECT * FROM cart_products WHERE cartrId = ?', [id]);
    res.send({ ...result[0][0], products: productsResult[0] });
};

export const addCart = async (req, res) => {
    const { userId, date, products } = req.body;
    const result = await pool.query(
        'INSERT INTO carts (userId, date) VALUES (?, ?)',
        [userId, date]
    );
    const cartId = result[0].insertId;
    const productPromises = products.map(product =>
        pool.query(
            'INSERT INTO cart_products (cartId, productId, quantity) VALUES (?, ?, ?)',
            [cartId, product.productId, product.quantity]
        )
    );
    await Promise.all(productPromises);
    res.send({ id: orderId, ...req.body });
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
