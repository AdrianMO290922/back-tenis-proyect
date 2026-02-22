import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { EmpleadosService } from "src/empleados/empleados.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { GithubStrategy } from "./github.strategy";
import { PassportModule } from "@nestjs/passport";


@Module({
    imports: [PrismaModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' }
        }),
        PassportModule.register({ defaultStrategy: 'github' })
    ],
    controllers: [AuthController],
    providers: [EmpleadosService,AuthService,GithubStrategy ],
    exports: [] 
})
export class AuthModule {}