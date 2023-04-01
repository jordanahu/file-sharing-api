import {Injectable} from "@nestjs/common";




@Injectable()
export class FileSharingService{

    upload(){
        console.log("yeii uploadinng")
    }

    getFile(publicKey){
        console.log("the key is, ", publicKey)
        return ["file 1", "file 2"]
    }

    deleteFile(publicKey){
        return "deleted with public key, " + publicKey
    }
}