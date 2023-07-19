import { IsString, IsNotEmpty } from "class-validator";

export class Tag {
  constructor() {
    this.id = "";
    this.name = "";
  }
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
