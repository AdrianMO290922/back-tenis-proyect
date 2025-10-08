import { Module } from '@nestjs/common';

import { ClientesModule } from './clientes/clientes.module';
import { InventarioModule } from './inventario/inventario.module';
import { PrismaModule } from './prisma/prisma.module';
import { Cliente } from './clientes/entities/cliente.entity';
import { EmpleadosModule } from './empleados/empleados.module';


@Module({
  imports: [PrismaModule, ClientesModule, EmpleadosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
