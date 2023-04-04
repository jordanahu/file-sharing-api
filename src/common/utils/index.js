import crypto from "crypto";
import path from "path"
import fs from "fs";
const { promisify } = require('util');

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


//get all details of the folder where files are saved
function getSavedFolderPathDetails(fileName, folderName){
        //directory level to move up
        const dirLevel = 3;
        const dirLevelArr = Array.from({length:dirLevel}, (_)=>"..");
        const dirPath = path.join(__dirname, ...dirLevelArr, folderName);
        const absFilePath = path.join(__dirname, ...dirLevelArr, folderName,fileName );
        const filesDbPath = path.join(__dirname,...dirLevelArr, folderName, "data.json")
      
        return {absFilePath, dirPath, filesDbPath}
}





// Promisify the fs functions
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const readdir = promisify(fs.readdir);

// Define a function that takes a directory path and a number of inactive minutes as parameters and returns a promise
async function cleanInactiveFiles(dirPath, inactiveMinutes) {
  // Check if the directory path is valid
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    // If not, short circuit(end)
    return;
  }

  // Get the current timestamp in milliseconds
  const now = Date.now();

  // Define a helper function that takes a file path as a parameter and returns a promise
  async function checkFile(filePath) {
    // Get the file stats
    const stats = await stat(filePath);

    // Check if the file is a directory
    if (stats.isDirectory()) {
      // If so, recursively call the main function on it and await the result
      await cleanInactiveFiles(filePath, inactiveMinutes);
    } else {
      // Otherwise, check if the file is inactive for more than the specified minutes
      if (now - stats.mtime.getTime() > inactiveMinutes * 60 * 1000) {
        // If so, delete the file and resolve the promise
        await unlink(filePath);
      }
    }
  }

  // Read the directory contents
  const files = await readdir(dirPath);

  // Map each file name to its full path
  const filePaths = files.map((file) => path.join(dirPath, file));

  // Use Promise.all to iterate over the file paths and call checkFile on each one in parallel and await the results
  await Promise.all(filePaths.map(checkFile));
}



function getUserIP(request) {
    const forwardedFor = request.headers['x-forwarded-for'];

    if (forwardedFor) {
      const ipAddresses = forwardedFor.split(', ');
      return ipAddresses[ipAddresses.length - 1];
    } else {
      return request.connection.remoteAddress;
    }
  }



export {
    generateKeys,
    getSavedFolderPathDetails,
    cleanInactiveFiles,
    getUserIP
}