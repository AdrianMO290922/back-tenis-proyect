import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadosModule } from './empleados/empleados.module';
import { MarcasModule } from './marcas/marcas.module';
import { DomiciliosModule } from './domicilios/domicilios.module';

@Module({
  imports: [EmpleadosModule,MarcasModule, DomiciliosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
