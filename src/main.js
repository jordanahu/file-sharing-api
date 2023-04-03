import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import path from "path";
import { cleanInactiveFiles } from './common/utils';
/*
  Entry point of the api
*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);  
  await app.listen(configService.get("PORT"));

  //Clean saved files after a period of inactivity
  const minutesOfInactivity = configService.get("MINUTES_OF_INACTIVITY");
  const dirPath = path.join(__dirname,"..", configService.get("FOLDER"))
  await cleanInactiveFiles(dirPath, minutesOfInactivity)

}
bootstrap();
