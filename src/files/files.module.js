import {Module} from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FileSharingModule } from "../common/services/file-sharing/file-sharing.module";
import { ValidateKey } from "../common/middlewares/validate-key.middleware";

@Module({
    imports:[FileSharingModule],
    controllers:[FilesController],
})
export class FilesModule{
    configure(consumer){
        consumer
        .apply(ValidateKey)
        .forRoutes(FilesController)
    }
}