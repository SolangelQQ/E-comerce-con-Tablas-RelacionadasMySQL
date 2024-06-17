import { createPool } from "mysql2/promise";
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'SQL5588*()_09',
    port: '3306',
    database: 'mi_tienda'
})