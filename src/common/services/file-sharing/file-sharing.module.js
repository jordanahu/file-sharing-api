import {Module} from "@nestjs/common";
import { FileSharingService } from "./file-sharing.service";
import { ConfigModule } from '@nestjs/config';



//configuration of the config module to enable access to environment variables
@Module({
    imports:[ConfigModule.forRoot()],
    providers:[FileSharingService],
    exports:[FileSharingService, ConfigModule]
})
export class FileSharingModule{}