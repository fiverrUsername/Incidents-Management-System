import { IsString, IsNotEmpty } from "class-validator";
import { ITag } from "../interfaces/tagInterface";
import { constants } from "../loggers/constants";

export class TagDto {
  constructor(init: ITag) {
    this.id = "";
    this.name = "";
    Object.assign(this, init);
  }
  @IsNotEmpty({ message: `id ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `id ${constants.INVALID_MESSAGE}` })
  id: string;

  @IsNotEmpty({ message: `name ${constants.EMPTY_OBJECT}` })
  @IsString({ message: `name ${constants.INVALID_MESSAGE}` })
  name: string;
}
