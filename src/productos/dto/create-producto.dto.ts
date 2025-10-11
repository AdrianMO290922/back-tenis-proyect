import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsNumber()
    @IsNotEmpty()
    categoria_id: number;

    @IsNumber()
    @IsNotEmpty()
    marca_id: number;
}
