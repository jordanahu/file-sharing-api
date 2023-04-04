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

    //handle all routes starting with /files/*
    @Get("*")
    async downloadFile( @Req() req ) {
        //get ip address
        const ipAddress = getUserIP(req);
        
        try{
             let publicKey = req.originalUrl.split("/").slice(2).join("/")
            return await this.#fileSharingService.downloadFile(publicKey, ipAddress);
          }catch(err){
            throw new BadRequestException(err.message)
        }
    }

    //hadle all file upload request
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

    //hadle all file deletion request
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