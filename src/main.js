import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import path from "path";
import { cleanInactiveFiles } from './common/utils';
/*
  Entry point of the api
*/
async function bootstrap() {
  //start the server
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);  
  await app.listen(configService.get("PORT"));

  //Clean saved files after a period of inactivity
  const minutesOfInactivity = configService.get("MINUTES_OF_INACTIVITY");
  const savedFilesDirPath = path.join(__dirname,"..", configService.get("FOLDER"))
  const savedUsersDirPath = path.join(__dirname,"..", "usersData")
  await cleanInactiveFiles(savedFilesDirPath, minutesOfInactivity)
  await cleanInactiveFiles(savedUsersDirPath, minutesOfInactivity)

}
bootstrap();
