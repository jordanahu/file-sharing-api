import crypto from "crypto";




//generating public and private keys using the DiffieHellman algorithm
function generateKeys(){
    //length of key
    let primeLength = 600;
    let diffHell = crypto.createDiffieHellman(primeLength);
    diffHell.generateKeys("base64");
    
    let privateKey = diffHell.getPrivateKey("base64");
    let publicKey = diffHell.getPublicKey("base64");

    return {privateKey, publicKey}
}



export {
    generateKeys
}