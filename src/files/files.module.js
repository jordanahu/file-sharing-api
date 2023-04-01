import {Module} from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FileSharingModule } from "../common/services/file-sharing/file-sharing.module";

@Module({
    imports:[FileSharingModule],
    controllers:[FilesController],
})
export class FilesModule{}