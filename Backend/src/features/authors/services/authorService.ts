import authorModel from "../../../dataAccess/entityModels/author";
import * as authorRepository from "../repositories/authorRepository"
import { AuthorFilterModel } from "../../shared/filterModels/authorFilterModel";
import { BaseResponse } from "../../shared/db-models/BaseResponse";
import { validateWithJsonSchema } from "../../utils/validateWithJsonSchema";
import  authorVlidateSchema  from "../operations/AuthorRequest.schema.json";
import idValidateSchema from "../../utils/IdRequest.schema.json";
import logger from "../../utils/logger";
import { logInAsync } from "../../auth/auth.service";

 let author = new authorModel();
export async function createAsync(authorParam: authorModel): Promise<any>  {
   const validateResult = validateWithJsonSchema(authorParam, authorVlidateSchema)
   logger.info(`>>>> authorService.create(), with: author = ${JSON.stringify(authorParam)}`)
    
   if (!validateResult.valid) {
       logger.error(`>>>> authorService.create(), invalid data = ${validateResult.errors}`)
       return {message: "Invalid AuthorCreate request", error: validateResult.errors}
    }

   const result = await authorRepository.createAsync(authorParam);

   if (!result) {
      logger.error(`>>>> authorService.create(), result = ${result}`)
      return "aurhor did not create"
   }

   return "Ok";
}

export async function removeAsync(id: string): Promise<any> {
   console.log(id)
   const validateResult = validateWithJsonSchema(id,idValidateSchema)
   logger.info(`>>>> authorService.remove(), with: Id = ${JSON.stringify(id)}`)

   if (!validateResult.valid) {
      logger.error(`>>>> authorService.remove(), invalid data = ${validateResult.errors}`)
      return "id is not valid"
   }

   const result = await authorRepository.removeAsync(id);

   if (!result) {
      logger.error(`>>>> authorService.create(), result = ${result}`)
      return "author did not remove";
   }

   return result;
}

export async function updateAsync(authorParam: authorModel): Promise<any> {
   console.log(authorParam)
   const validateResult = validateWithJsonSchema(authorParam, authorVlidateSchema)
   logger.info(`>>>> authorService.update(), with: author = ${JSON.stringify(authorParam)}`)

   if (!validateResult.valid) {
      logger.error(`>>>> authorService.update(), invalid data = ${validateResult.errors}`)
      return {message: "Invalid Author Update request", error: validateResult.errors}
   }

  
   const result = await authorRepository.updateAsync(authorParam);
   if (!result) {
      logger.error(`>>>> authorService.update(), result = ${result}`)
      return "aurhor did not update"
   }
   return "Ok";
}

export async function getAsync() : Promise<Array<authorModel>> {
   logger.info('>>>> authorService.get()');
   const result =await authorRepository.GetAsync();
   if (result.length==0) {
      logger.error('>>>> authorService.get(), list of authors is empty')
   }
   return result;
}

export async function getAuthorsAsync(filter: AuthorFilterModel): Promise<BaseResponse<authorModel>> {
   logger.info(`>>>> authorService.getAuthors(), with: filter = ${JSON.stringify(filter)}`)
   const result = await authorRepository.GetAuthorsAsync(filter);
   return result
}