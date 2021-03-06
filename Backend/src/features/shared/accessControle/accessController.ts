import { Request, Response, NextFunction } from 'express'
import * as jwt from "jsonwebtoken";
import * as env from 'dotenv';
import { Role } from "../enums/role";

env.config();

export function checkPermission(currentRole: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const accesstoken = <string>req.headers["accesstoken"];
        const jwtPayload = <any>jwt.verify(accesstoken, process.env.SECRET);
        console.log('we are here')
        if (Role[jwtPayload.role] !== currentRole) {
            res.status(401).send(' you are dont permission')
            return;
        }
        next()
    }
}