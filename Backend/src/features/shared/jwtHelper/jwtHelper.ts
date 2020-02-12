import userModel from "../db-models/user";
import jwt from 'jsonwebtoken';
import {Response} from 'express';
import { User } from "../../user/api";


export const generateTokens = (userModel: userModel, response: Response) => {
    
    if (userModel == null) {
        return userModel;
    }

    const user = {
        "role": userModel.role,
        "id": userModel._id
    }
    console.log(user)
    const secret: any = process.env.secret;
    const accessTokenLife: any = process.env.accessTokenLife;
    const accessToken = jwt.sign(user, secret,  {expiresIn: accessTokenLife});

   const refreshTokenSecret : any = process.env.refreshTokenSecret;
   const refreshTokenLife : any = process.env.refreshTokenLife;
   const refreshToken = jwt.sign(user, refreshTokenSecret, {expiresIn: refreshTokenLife})

   response.setHeader('AccessToken', accessToken);
   response.setHeader('RefreshToken',refreshToken);
  
   const respons = {
    "status": "Logged in",
    "token": accessToken,
    "refreshToken": refreshToken,
}
    return respons;
}