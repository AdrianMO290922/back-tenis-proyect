import { Injectable } from "@nestjs/common";
import { CreateProductoDto } from "./dto/create-producto.dto"; 
import { UpdateProductoDto } from "./dto/update-producto.dto";
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorManager } from "src/utils/error.manager";

@Injectable()
export class ProductoService {

  constructor(private prisma: PrismaService) {}
  
  async create(createProductoDto: CreateProductoDto) {
    return await this.prisma.productos.create({data: createProductoDto});
  }

  async findAll() {
    return await this.prisma.productos.findMany();
  }

  async findOne(id: number) {
    try {
      const producto = await this.prisma.productos.findUnique({ where: { id } });
      if (!producto) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El producto con id ${id} no existe`,
        });
      } 
      return producto;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    try {
      const updatedProducto = await this.prisma.productos.update({ where: { id }, data: updateProductoDto });
      if (!updatedProducto) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El producto con id ${id} no existe`,
        });
      }
      return updatedProducto;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: number) {
    try {
      const deletedProducto = await this.prisma.productos.delete({ where: { id } }); 
      if (!deletedProducto) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El producto con id ${id} no existe`,
        });
      }
      return deletedProducto;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}