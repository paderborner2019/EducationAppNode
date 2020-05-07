import { Request, Response, NextFunction } from "express";
import * as authService from '../auth/auth.service';
import * as jwtHelper from "./jwtHelper/jwtHelper";

export async function registerAsync(req: Request,res: Response,next: NextFunction) {
   
    await authService.registerAsync(req.body.user)
    .then((err) => res.json({err}))
    .catch(err => next(err))
  }

  export async function authenticateAsync(req: Request, res: Response, next: NextFunction) {
    await authService.logInAsync(req.body.email,req.body.password)
    .then(user => res.send(user))
    .catch();
  }

  export async function confirmEmailAsync(req: Request, res: Response, next: NextFunction) {
    await authService.confirmEmailAsync(req.body)
    .then((err) => res.json({err}))
    .catch();
  }

  export async function refreshTokens(req: Request, res: Response) {
        jwtHelper.refreshTokens(res,req).then((err)=>console.log(err))
  }

  /*export async function oAuht(req: Request, res: Response) {
    authService.oAuth(req.body.name).then((err) => res.redirect(err)).catch()
  }
*/
  export async function oAuhtCallback(req: Request, res: Response, next: NextFunction) {
    await authService.oAuthCallBack(req.body.code)
    .then((err) => res.json({err}))
    .catch();
  }
