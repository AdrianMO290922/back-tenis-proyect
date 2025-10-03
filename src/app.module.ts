import { Module } from '@nestjs/common';

import { ClientesModule } from './clientes/clientes.module';
import { InventarioModule } from './inventario/inventario.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [PrismaModule, ClientesModule, InventarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
