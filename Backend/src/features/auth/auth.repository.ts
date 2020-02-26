import { User } from "../user/api";
import userModel from "../../dataAccess/entityModels/user";
import bcrypt from "bcrypt";
import * as userRepository from "../user/repositories/userRepositiry"


export async function registerAsync (userParam: User): Promise<any> {
    const checkUser = await userModel.findOne({email: userParam.email})

    if (checkUser != null) {
        false
    }

    let user = new userModel(userParam);
    const salt = bcrypt.genSaltSync(10);
    user.passwordHash = bcrypt.hashSync(userParam.passwordHash, salt);

    try {
        let result = await userModel.create(user)
    } catch (error) {
        return error.errmsg  
    }
    
     return true;
}

export async function signInAsync(email: string, password: string): Promise<any> {
    let user = await userModel.findOne({ email: email })

    if (user == null) {
      
        return "user is not found"; 
    }
    
    const isPasswordValid = await userRepository.checkPasswordAsync(password,user);
   
    if (!isPasswordValid) {
       return "invalid password";
    }
        console.log(user)
      return user ;
}

export async function changePasswordAsync() {
    
}