


export class FileDto{
    privateKey;
    publicKey;
    fileName;
    filePath;
    constructor(fileName, publicKey, privateKey, filePath){
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.fileName = fileName;
        this.filePath = filePath;
    }
}