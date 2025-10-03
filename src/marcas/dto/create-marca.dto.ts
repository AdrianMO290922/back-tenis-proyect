import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMarcaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  nombre: string;
}
