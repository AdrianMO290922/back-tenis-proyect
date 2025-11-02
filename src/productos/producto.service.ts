import { Injectable } from "@nestjs/common";
import { CreateProductoDto } from "./dto/create-producto.dto"; 
import { UpdateProductoDto } from "./dto/update-producto.dto";
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorManager } from "src/utils/error.manager";

@Injectable()
export class ProductoService {

  constructor(private prisma: PrismaService) {}
  
  async create(createProductoDto: CreateProductoDto) {
    return await this.prisma.productos.create({
      data: {
        nombre: createProductoDto.nombre,
        color: createProductoDto.color,
        categoria_id: createProductoDto.categoria_id,
        marca_id: createProductoDto.marca_id,
      },
      include:{
        categorias: true,
        marcas: true,
        inventarios: true,
      },
    });
  }

  async findAll() {
    const productos = await this.prisma.productos.findMany({
      include:{
        categorias: true,
        marcas: true,
        inventarios: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return productos;
  }

  async findOne(id: number) {
    try {
      const producto = await this.prisma.productos.findUnique({ 
        where: { id },
        include:{
          categorias: true,
          marcas: true,
          inventarios: true,
        },
        
      });
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
      const updatedProducto = await this.prisma.productos.update({ 
        where: { id }, 
        data: updateProductoDto,
        include:{
          categorias: true,
          marcas: true,
          inventarios: true,
        },
      });
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

  async findByCategoria(categoria_id: number) {
    return this.prisma.productos.findMany({
      where: { categoria_id },
      include:{
        categorias: true,
        marcas: true,
        inventarios: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findByMarca(marca_id: number) {
    return this.prisma.productos.findMany({
      where: { marca_id },
      include:{
        categorias: true,
        marcas: true,
        inventarios: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}