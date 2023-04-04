import {Injectable, Dependencies,HttpMethod,BadRequestException,UnauthorizedException } from "@nestjs/common";
import { FileSharingService } from "../services/file-sharing/file-sharing.service";


//Middle ware to intercept incoming requests and validate the api keys 
@Injectable()
@Dependencies(FileSharingService)
export class ValidateKey {
    #fileSharingService;
    constructor(fileSharingService){
        this.#fileSharingService = fileSharingService;

    }

    async use(req, _, next){

        try{
            //get the api key
            let key = req.params[0].trim();
            if(!key){
                throw new BadRequestException("must provide a key")
            }
            
            //validation of api key
            let passedValidation = false;
            switch(req.method){
                case "GET":
                    passedValidation = await this.#fileSharingService.isValidPublicKey(key) 
                    break;
                case "DELETE":
                    passedValidation = await this.#fileSharingService.isValidPrivateKey(key)
                    break;
                    
            }

            
            if(passedValidation) {
                
                next();
            }else{
                throw new UnauthorizedException("Unauthorized", {description:"You gave a wrong key"})

            }
        }catch(err){
            throw new BadRequestException(err.message)
        }

            
           
       
    }

}