


export class FileDto{
    //readonly attributes to maintain integrity
    #privateKey;
    #publicKey;
    #file;
    constuctor(privateKey, publicKey, file){
        this.#privateKey = privateKey;
        this.#publicKey = publicKey;
        this.#file = file;
    }
}