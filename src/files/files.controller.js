import { Controller,Bind,Req, Dependencies, BadRequestException,Get,Body,UseInterceptors, Post,Delete,UploadedFile, Param } from '@nestjs/common';
import { FileSharingService } from '../common/services/file-sharing/file-sharing.service';
import {FileInterceptor} from "@nestjs/platform-express"
require('reflect-metadata');
import {getUserIP} from "../common/utils"


@Controller("files")
@Dependencies(FileSharingService)
export class FilesController{
    #fileSharingService

    constructor(fileSharingService){
        this.#fileSharingService = fileSharingService
    }

    @Get("*")
    async downloadFile( @Req() req ) {
        const ipAddress = getUserIP(req);
        
        try{
             let publicKey = req.originalUrl.split("/").slice(2).join("/")
            return await this.#fileSharingService.downloadFile(publicKey, ipAddress);
          }catch(err){
            throw new BadRequestException(err.message)
        }
    }

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    @Bind(UploadedFile())
    async uploadFile(file){
        try{
            return await this.#fileSharingService.upload(file);
        }catch(err){
            throw new BadRequestException(err.message)
        }
    }

    @Delete("*")
     async deleteFile(@Req() req){
         try{
            let privateKey = req.originalUrl.split("/").slice(2).join("/")

            return await this.#fileSharingService.deleteFile(privateKey)
        }catch(err){
            throw new BadRequestException(err.message)
        }
    }

}