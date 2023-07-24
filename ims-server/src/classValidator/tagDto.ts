import { IsString, IsNotEmpty } from "class-validator";
import { ITag } from "../interfaces/tagInterface";

export class TagDto {
  constructor(init: ITag) {
    this.id = "";
    this.name = "";
    Object.assign(this, init);
  }
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
