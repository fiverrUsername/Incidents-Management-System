import { IsString, IsNotEmpty } from "class-validator";
import { ITag } from "../interfaces/tagInterface";
import { CONSTANTS } from "../loggers/constants";

export class TagDto {
  constructor(init: ITag) {
    this.id = "";
    this.name = "";
    Object.assign(this, init);
  }
  @IsNotEmpty({ message: `id ${CONSTANTS.EMPTY_OBJECT}` })
  @IsString({ message: `id ${CONSTANTS.INVALID_MESSAGE}` })
  id: string;

  @IsNotEmpty({ message: `name ${CONSTANTS.EMPTY_OBJECT}` })
  @IsString({ message: `name ${CONSTANTS.INVALID_MESSAGE}` })
  name: string;
}
