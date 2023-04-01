import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FileSharingService } from './common/services/file-sharing/file-sharing.service';
import { FilesModule } from './files/files.module';


@Module({
  imports: [ConfigModule.forRoot(), FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
