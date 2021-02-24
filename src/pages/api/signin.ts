import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../api/db'
import { compare } from 'bcrypt'
import {sign} from 'jsonwebtoken'
import cookie from 'cookie'
export default async function signup(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const person = await pool.query('SELECT * FROM person WHERE email=$1',[req.body.email])
        const result = await compare(req.body.password,person.rows[0].password)
        if(result){
            const claims = {sub:person.rows[0].id,myPersonEmail:person.rows[0].email}
            const jwt = sign(claims,'mysuper secret',{expiresIn:'1h'})
            res.setHeader('Set-Cookie',cookie.serialize('auth',jwt,{
                httpOnly:true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite:'strict',
                maxAge:3600,
                path:'/'
            }))
            res.json({message:"Welcome back to app"})
        }else{
            res.json({message:'Ups, Something went wrong!'})
        }
    } else {
        res.status(405).json({ message: 'We only support POST' })
    }
}