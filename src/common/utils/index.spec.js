import fs from 'fs';
import path from 'path';
const crypto = require('crypto');
import { getSavedFolderPathDetails,generateKeys } from './';

function getTestFilePathAndFolderPath(){
     const dirLevel = 3;
    let testFolderName = "testSavedFolder";
    let fileName = "testFile.txt";
    let testFilesDbName = "data.json";
    const dirLevelArr = Array.from({length:dirLevel}, (_)=>"..");
    const testFolderPath = path.join(__dirname, ...dirLevelArr, testFolderName);
    const testFilePath = path.join(__dirname, ...dirLevelArr, testFolderName,fileName );
    const testFilesDbPath = path.join(__dirname, ...dirLevelArr, testFolderName,testFilesDbName);

    return {testFolderPath, testFilePath,testFilesDbPath}
}

describe('getSavedFolderPathDetails', () => {

  beforeAll( () => {
    // Create test folder and file
   
  
    let {testFolderPath, testFilePath,testFilesDbPath} = getTestFilePathAndFolderPath()

    fs.mkdirSync(testFolderPath);
    fs.writeFileSync(testFilePath, 'test file content');
    fs.writeFileSync(testFilesDbPath, 'test file content');
  });

  afterAll( () => {
    // Remove test folder and file
    let {testFolderPath, testFilePath,testFilesDbPath} = getTestFilePathAndFolderPath()


    fs.unlinkSync(testFilesDbPath);
    fs.unlinkSync(testFilePath);
    fs.rmdirSync(testFolderPath);
  });

  it('should return correct paths for file and directory', () => {
    let {testFolderPath, testFilePath,testFilesDbPath} = getTestFilePathAndFolderPath();
    let testFolderName = "testSavedFolder";
    let testFileName = "testFile.txt"
    const { absFilePath, dirPath, filesDbPath } = getSavedFolderPathDetails(testFileName, testFolderName);


    expect(absFilePath).toEqual(testFilePath);
    expect(dirPath).toEqual(testFolderPath);
    expect(filesDbPath).toEqual(testFilesDbPath);
  });





});


describe('generateKeys function', () => {
  it('should return an object with a privateKey and publicKey property', () => {
    const keys = generateKeys();
    expect(keys).toHaveProperty('privateKey');
    expect(keys).toHaveProperty('publicKey');
  });

  it('should return keys that have a length of 600', () => {
    const { privateKey, publicKey } = generateKeys();


    expect(privateKey.length).toBe(100);
    expect(publicKey.length).toBe(100);
  });
});
