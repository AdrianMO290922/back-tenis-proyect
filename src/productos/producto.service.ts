import { Injectable } from "@nestjs/common";
import { CreateProductoDto } from "./dto/create-producto.dto"; 
import { UpdateProductoDto } from "./dto/update-producto.dto";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductoService {

  constructor(private prisma: PrismaService) {}
  
  async create(createProductoDto: CreateProductoDto) {
    return await this.prisma.productos.create({
      data: createProductoDto
    });
  }

  async findAll() {
    return await this.prisma.productos.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.productos.findUnique({ where: { id } });
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    return await this.prisma.productos.update({
      where: { id },
      data: updateProductoDto
    });
  }

  async remove(id: number) {
    return await this.prisma.productos.delete({ where: { id } });
  }
}