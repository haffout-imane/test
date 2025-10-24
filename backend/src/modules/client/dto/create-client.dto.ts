import { IsString, IsEmail, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  domains: string[];
}
