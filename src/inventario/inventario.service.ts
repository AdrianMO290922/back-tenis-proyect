import { Injectable } from "@nestjs/common";
import { CreateInventarioDto } from "./dto/create-inventario.dto"; 
import { UpdateInventarioDto } from "./dto/update-inventario.dto";

@Injectable()
export class InventarioService {
    create(createInvetarioDto: CreateInventarioDto) {
        return "This action adds a new producto";
    }

    findAll() {
        return `This action returns all productos`;
    }

    findOne(id: number) {
        return `This action returns a #${id} producto`;
    }

    update(id: number, updateInventarioDto: UpdateInventarioDto) {
        return `This action updates a #${id} producto`;
    }

    remove(id: number) {
        return `This action removes a #${id} producto`;
    }
}