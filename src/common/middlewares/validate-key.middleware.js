import {Injectable, Dependencies,HttpMethod,BadRequestException,UnauthorizedException } from "@nestjs/common";
import { FileSharingService } from "../services/file-sharing/file-sharing.service";

@Injectable()
@Dependencies(FileSharingService)
export class ValidateKey {
    #fileSharingService;
    constructor(fileSharingService){
        this.#fileSharingService = fileSharingService;

    }

    async use(req, _, next){

        try{
            let key = req.params[0].trim();
            if(!key){
                throw new BadRequestException("must provide a key")
            }
            

            let passedValidation = false;
            switch(req.method){
                case "GET":
                    passedValidation = await this.#fileSharingService.isValidPublicKey(key) 
                    break;
                case "DELETE":
                    console.log("method is", req.method)
                    passedValidation = await this.#fileSharingService.isValidPrivateKey(key)
                    break;
                default:
                    console.log("hmm is", passedValidation)
                    
            }

            
            if(passedValidation) {
                console.log("calleddd")
                next();
            }else{
                throw new UnauthorizedException("Unauthorized", {description:"You gave a wrong key"})

            }
        }catch(err){
            throw new BadRequestException(err.message)
        }

            
           
       
    }

}