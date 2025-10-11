import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateInventarioDto {
    @IsNumber()
    @IsNotEmpty()
    producto_id: number;

    @IsString()
    @IsNotEmpty()
    talla: string;

    @IsNumber()
    @IsNotEmpty()
    cantidad: number;

    @IsNumber()
    @IsNotEmpty()
    precio_venta: number;

    @IsNumber()
    @IsNotEmpty()
    precio_compra: number;
}
