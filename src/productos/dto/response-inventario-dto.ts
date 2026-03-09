import { Expose } from 'class-transformer';

export class ClientResponseDto {
    @Expose() id: number;
    @Expose() nombre: string;
    @Expose() color: string;
    @Expose() categoria_id: number;
    @Expose() marca_id: number;
}