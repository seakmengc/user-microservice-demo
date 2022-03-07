import { IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(8)
    password: string;
}
