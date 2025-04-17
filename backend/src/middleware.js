import dotenv from "dotenv";
import { Response, ReceiveResponse } from '../src/utils/responses.js';
import jwt from 'jsonwebtoken';
dotenv.config();

export default function VerifyToken(req, res, next) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
        const response = Response('Token not exists', false);
        return ReceiveResponse(response, res);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            const response = Response(`Token invalide: ${err.message}`, false);
            return ReceiveResponse(response, res);
        }

        req.user = user;
        next(); // só chama o next se o token for válido
    });
}
