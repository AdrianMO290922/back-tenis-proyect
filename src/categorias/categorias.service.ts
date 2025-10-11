import { Injectable } from "@nestjs/common";
import { CreateCategoriaDto } from "./dto/create-categoria.dto"; 
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoriasService {

    constructor(private prisma: PrismaService) {}
    
    async create(createCategoriaDto: CreateCategoriaDto) {
        const createCategoria = await this.prisma.categorias.create({
            data:{
                nombre: createCategoriaDto.nombre
            }
        });
        return createCategoria;
    }

    async findAll() {
        return this.prisma.categorias.findMany();
    }

    async findOne(id: number) {
        return this.prisma.categorias.findUnique({where:{id}});
    }

    async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
        return this.prisma.categorias.update({where:{id},data:{...updateCategoriaDto}});
    }

    async remove(id: number) {
        return this.prisma.categorias.delete({where:{id}});
    }
}
