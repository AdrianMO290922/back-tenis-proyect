import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { EmpleadosService } from "src/empleados/empleados.service";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [EmpleadosService ],
    exports: [] 
})
export class AuthModule {}