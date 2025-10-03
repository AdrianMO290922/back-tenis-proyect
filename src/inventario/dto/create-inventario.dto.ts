import { IsString, IsNumber } from 'class-validator';

export class CreateInventarioDto {
    @IsNumber()
    idproducto: number;

    @IsString()
    talla: string;

    @IsNumber()
    cantidad: number;

    @IsNumber()
    precioVenta: number;

    @IsNumber()
    precioCompra: number;
}
