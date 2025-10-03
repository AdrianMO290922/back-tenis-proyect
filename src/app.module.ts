import { Module } from '@nestjs/common';

import { ClientesModule } from './clientes/clientes.module';
import { InventarioModule } from './inventario/inventario.module';
import { PrismaModule } from './prisma/prisma.module';
import { Cliente } from './clientes/entities/cliente.entity';


@Module({
  imports: [PrismaModule, ClientesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
