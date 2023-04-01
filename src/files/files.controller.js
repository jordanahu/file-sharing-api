import { Controller, Dependencies, Get, Post,Delete, Param } from '@nestjs/common';
import { FileSharingService } from '../common/services/file-sharing/file-sharing.service';
require('reflect-metadata');



@Controller("files")
@Dependencies(FileSharingService)
export class FilesController{
    fileSharingService

    constructor(fileSharingService){
        this.fileSharingService = fileSharingService
    }

    @Get(":publicKey")
    getFile( @Param("publicKey") publicKey ) {
        const files = this.fileSharingService.getFile(publicKey);
        return "these are the files bro" + files;
    }

    @Post()
    postFile(){

        const publicKey = "public";
        const privateKey = "private";
        return {publicKey, privateKey}
    }

    @Delete(":privateKey")
    deleteFile(@Param("privateKey") privateKey){
        return "success"
    }

}