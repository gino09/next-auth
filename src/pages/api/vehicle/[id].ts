import { NextApiRequest, NextApiResponse } from 'next';
import {pool} from '../../../../api/db'

export default async function getVehicleById(req: NextApiRequest, res: NextApiResponse) {
    const vehicle = await pool.query('select * from vehicle where id = $1', [req.query.id]);
    res.json(vehicle.rows);
} 