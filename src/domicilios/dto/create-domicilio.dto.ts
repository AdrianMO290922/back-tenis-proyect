import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDomicilioDto {
  @MaxLength(45)
  @IsNotEmpty()
  calle: string;
  @MaxLength(45)
  @IsNotEmpty()
  colonia: string;
  @MaxLength(45)
  @IsNotEmpty()
  numero: string;
  @MaxLength(10)
  @IsNotEmpty()
  cp: string;
  @IsNotEmpty()
  @MaxLength(45)
  ciudad: string;
  @MaxLength(45)
  @IsNotEmpty()
  estado: string;
  @MaxLength(45)
  referencia?: string;
}
