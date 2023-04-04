import { FileDto } from "./file.dto";

describe('FileDto', () => {
  it('should create an object with the correct properties', () => {
    const fileName = 'test.txt';
    const publicKey = 'public_key';
    const privateKey = 'private_key';
    const filePath = '/files/test.txt';
    const file = new FileDto(fileName, publicKey, privateKey, filePath);
    expect(file.fileName).toEqual(fileName);
    expect(file.publicKey).toEqual(publicKey);
    expect(file.privateKey).toEqual(privateKey);
    expect(file.filePath).toEqual(filePath);
  });
});
