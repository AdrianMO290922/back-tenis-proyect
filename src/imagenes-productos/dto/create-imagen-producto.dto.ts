import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateImagenProductoDto {
    @IsInt()
    @IsNotEmpty()
    producto_id: number;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url: string;

    @IsBoolean()
    @IsOptional()
    es_principal?: boolean;
}