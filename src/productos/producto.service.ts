import { Injectable } from "@nestjs/common";
import { CreateProductoDto } from "./dto/create-producto.dto"; 
import { UpdateProductoDto } from "./dto/update-producto.dto";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductoService {

    constructor(private prisma: PrismaService) {}
    
    async create(createProductoDto: CreateProductoDto) {
        const createProducto = await this.prisma.productos.create({
            data:{
                nombre: createProductoDto.nombre,
                color: createProductoDto.color,
                categoria_id: createProductoDto.categoria_id,
                marca_id: createProductoDto.marca_id
            }
        });
        return createProducto;
    }

    async findAll() {
        return this.prisma.productos.findMany();
    }

    async findOne(id: number) {
        return this.prisma.productos.findUnique({where:{id}});
    }

    async update(id: number, updateProductoDto: UpdateProductoDto) {
        return this.prisma.productos.update({where:{id},data:{...updateProductoDto}});
    }

    async remove(id: number) {
        return this.prisma.productos.delete({where:{id}});
    }
}