import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';


//inherit all functionality from filesModule module
@Module({
  imports: [FilesModule],

})
export class AppModule {}
