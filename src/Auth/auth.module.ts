import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { EmpleadosService } from "src/empleados/empleados.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [PrismaModule,
        JwtModule.register({
            global: true,
            //secret: process.env.JWT_SECRET || 'Secret',
            secret:'SECRET',
            signOptions: { expiresIn: '1h' }
        })
    ],
    controllers: [AuthController],
    providers: [EmpleadosService ],
    exports: [] 
})
export class AuthModule {}