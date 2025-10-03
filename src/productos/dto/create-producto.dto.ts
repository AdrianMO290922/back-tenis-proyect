import { IsString, IsNumber } from 'class-validator';

export class CreateProductoDto {
    @IsString()
    nombre: string;

    @IsString()
    color: string;

    @IsNumber()
    idCategoria: number;

    @IsNumber()
    idMarca: number;
}
