import { NextApiRequest, NextApiResponse } from 'next';
import {pool} from '../../../../../api/db'

export default async function getPersonById(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'PUT') {
    const statement = await pool.query(
      'UPDATE person SET name=$1, email =$2 where id = $3', [req.body.name, req.body.email, req.query.id]
    );
  }

  const person = await pool.query('select * from person where id = $1', [
    req.query.id
  ]);
  res.json(person.rows);
}
