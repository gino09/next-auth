import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../api/db'
import {getId} from '../../../helpers/uuid'
import {hash} from 'bcrypt'
export default async function signup(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const hassPassword = await hash(req.body.password,10)
        const id = getId()
        await pool.query(
            'INSERT INTO person(name,email,password,id) VALUES ($1,$2,$3,$4)', [req.body.name, req.body.email, hassPassword,id]
        );
        const person = await pool.query('select * from person where id = $1', [id]);
        res.json(person.rows);
    }else{
        res.status(405).json({message:'We only support POST'})
    }
}