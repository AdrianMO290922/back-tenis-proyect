import { Expose } from 'class-transformer';

export class ClientResponseDto {
    @Expose() id: number;
    @Expose() producto_id: number;
    @Expose() talla: string;
    @Expose() cantidad: number;
    @Expose() precio_venta: number;
    @Expose() precio_compra: number;
}