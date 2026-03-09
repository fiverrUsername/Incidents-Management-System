import { ITag } from "../../interfaces/ITag";
import backendServices from "./backendServices";
export async function getTags(): Promise<ITag[]> {
        const getAllTags: any = await backendServices.getTags();
        return getAllTags;
}
