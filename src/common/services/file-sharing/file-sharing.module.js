import {Module} from "@nestjs/common";
import { FileSharingService } from "./file-sharing.service";

@Module({
    providers:[FileSharingService],
    exports:[FileSharingService]
})
export class FileSharingModule{}