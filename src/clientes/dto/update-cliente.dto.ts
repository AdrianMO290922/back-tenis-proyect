import { PartialType } from "@nestjs/mapped-types";
import { CrearteClienteDto } from "./create-cliente.dto";

export class UpdateClienteDto extends PartialType(CrearteClienteDto) {}