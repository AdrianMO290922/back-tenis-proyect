import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { EmpleadosService } from "src/empleados/empleados.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [AuthController],
    providers: [EmpleadosService ],
    exports: [] 
})
export class AuthModule {}