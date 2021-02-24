import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../api/db'

export default async function getAllVehicles(req: NextApiRequest, res: NextApiResponse) {
    const vehicle = await pool.query('SELECT * FROM vehicle');

    res.json(vehicle.rows);
} 