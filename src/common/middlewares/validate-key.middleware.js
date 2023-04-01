import {Injectable } from "@nestjs/common";

@Injectable()
export class ValidateKey {
    constructor(){

    }

    use(req, res, next){
        console.log("the keys are, ", req.params)
        next()
    }

}