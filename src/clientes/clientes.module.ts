import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ClientesService,PrismaService],
  controllers: [ClientesController],
})
export class ClientesModule {}
