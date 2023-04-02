import crypto from "crypto";
import path from "path"



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


function getSavedFolderPathDetails(fileName, folderName){
        const dirLevel = 3;
        const dirLevelArr = Array.from({length:dirLevel}, (_)=>"..");
        const dirPath = path.join(__dirname, ...dirLevelArr, folderName);
        const absFilePath = path.join(__dirname, ...dirLevelArr, folderName,fileName );
        const filesDbPath = path.join(__dirname,...dirLevelArr, folderName, "data.json")
      
        return {absFilePath, dirPath, filesDbPath}
}

export {
    generateKeys,
    getSavedFolderPathDetails
}