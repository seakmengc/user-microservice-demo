import { IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(8)
    password: string;
}
