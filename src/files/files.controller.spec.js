import request from 'supertest';
import { Test } from '@nestjs/testing';
import { FilesModule } from './files.module';
import { FileSharingService } from '../common/services/file-sharing/file-sharing.service';



describe('Files Controller', () => {
  let app;
  let catsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [FilesModule],
    })
      .overrideProvider(FileSharingService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });


  it(`/GET files should return 404 for no files found`, () => {
    return request(app.getHttpServer())
      .get('/files')
      .expect(404)

  });




  afterAll(async () => {
    await app.close();
  });
});