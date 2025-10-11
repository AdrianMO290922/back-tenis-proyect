import { Module } from '@nestjs/common';

import { ClientesModule } from './clientes/clientes.module';
import { InventarioModule } from './inventario/inventario.module';
import { PrismaModule } from './prisma/prisma.module';
import { Cliente } from './clientes/entities/cliente.entity';
import { EmpleadosModule } from './empleados/empleados.module';
import { DomiciliosModule } from './domicilios/domicilios.module';
import { VentasModule } from './ventas/ventas.module';
import { DetalleVentasModule } from './detalle-ventas/detalle-ventas.module';


@Module({
  imports: [
    PrismaModule, 
    ClientesModule, 
    EmpleadosModule,
    DomiciliosModule,
    VentasModule,
    DetalleVentasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
