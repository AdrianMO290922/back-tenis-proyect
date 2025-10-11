import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
//import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [ClientesService,PrismaService],
  controllers: [ClientesController],
})
export class ClientesModule {}
