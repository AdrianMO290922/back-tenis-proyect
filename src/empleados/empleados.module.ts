import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports:[PrismaModule, AuthModule],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
})
export class EmpleadosModule {}
