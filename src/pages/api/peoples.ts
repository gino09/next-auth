import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../api/db'
import { verify } from 'jsonwebtoken'

const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.cookies.auth!, 'mysuper secret', async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }
        console.log(err);
        res.status(401).json({ message: 'Sorry you are not authenticated' });
    });
}

export default authenticated(async function getPeople(req: NextApiRequest, res: NextApiResponse) {
    const people = await pool.query('select * from person');

    res.json(people.rows);
})