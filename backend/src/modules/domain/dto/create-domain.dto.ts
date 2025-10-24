import { IsInt, IsString } from 'class-validator';

export class CreateDomainDto {
  @IsString()
  name: string;

  @IsInt()
  clientId: number;
}
