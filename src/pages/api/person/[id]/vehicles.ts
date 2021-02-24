import { NextApiRequest, NextApiResponse } from 'next';
import {pool} from '../../../../../api/db'

export default async function getAllVehiclesByPersonId(req: NextApiRequest, res: NextApiResponse) {

    const allVehicles = await pool.query('select * from vehicle where ownerId = $1', [req.query.id]);
    res.json(allVehicles.rows);
} 