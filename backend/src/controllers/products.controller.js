import { pool } from "../db.js";

export const getProducts = async(req, res) => {
    const [result] = await pool.query('SELECT * FROM products')
    res.json(result);
}

export const getProductById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) 
        return res.status(404).json({ message: 'Product not found' });
    res.json(rows[0]);
}

export const deleteProduct = async (req, res) => {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.sendStatus(204);
}

export const addProduct = async (req, res) => {
    const { title, price, description, category, image, rating, ratingCount } = req.body;
    const [result] = await pool.query(
        'INSERT INTO products (title, price, description, category, image, rating, ratingCount) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, price, description, category, image, rating, ratingCount]
    );
    res.status(201).json({ id: result.insertId, title, price, description, category, image, rating, ratingCount });
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, price, description, category, image, rating } = req.body;
    const { rate, count } = rating;
    const [result] = await pool.query(
        'UPDATE product SET title = ?, price = ?, description = ?, category = ?, image = ?, rate = ?, count = ? WHERE id = ?',
        [title, price, description, category, image, rate, count, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ id, title, price, description, category, image, rating });
}