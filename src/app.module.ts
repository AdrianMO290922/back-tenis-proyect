import { Module } from '@nestjs/common';

import { ClientesModule } from './clientes/clientes.module';
import { InventarioModule } from './inventario/inventario.module';
import { PrismaModule } from './prisma/prisma.module';
import { Cliente } from './clientes/entities/cliente.entity';
import { EmpleadosModule } from './empleados/empleados.module';
import { DomiciliosModule } from './domicilios/domicilios.module';
import { ProductoModule } from './productos/producto.module';
import { VentasModule } from './ventas/ventas.module';
import { DetalleVentasModule } from './detalle-ventas/detalle-ventas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { MarcasModule } from './marcas/marcas.module';
import { AuthModule } from './Auth/auth.module';



@Module({
  imports: [
    PrismaModule, 
    ClientesModule, 
    EmpleadosModule,
    DomiciliosModule,
    ProductoModule,
    InventarioModule,
    VentasModule,
    DetalleVentasModule,
    CategoriasModule,
    MarcasModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
