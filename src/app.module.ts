import { Module } from '@nestjs/common';

import { ClientesModule } from './clientes/clientes.module';
import { InventarioModule } from './inventario/inventario.module';
import { PrismaModule } from './prisma/prisma.module';
import { Cliente } from './clientes/entities/cliente.entity';
import { EmpleadosModule } from './empleados/empleados.module';
import { DomiciliosModule } from './domicilios/domicilios.module';


@Module({
  imports: [PrismaModule, ClientesModule, EmpleadosModule,DomiciliosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
