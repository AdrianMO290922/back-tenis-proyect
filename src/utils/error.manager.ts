import { HttpException, HttpStatus } from "@nestjs/common";

 export class ErrorManager extends Error{
    constructor({type, message}: {type: keyof typeof HttpStatus, message:string}) {

        super(`${type} :: ${message}`);
    
    }
     public static createSignatureError(message:string ){
        const name = message.split (' :: ')[0];
        const errorMessage = message.split (' :: ')[1];
        if(name ){
                return new HttpException(
        {
          statusCode: HttpStatus[name],
          message: errorMessage || "Ocurrio un error",
          error: name, // Formatea el tipo de error (e.g., "BAD_REQUEST" -> "Bad Request")
        },
        HttpStatus[name]
      );

        }else{
            return new HttpException({
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
                message:errorMessage,
                error:"INTERNAL_SERVER_ERROR"
            },HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
 }