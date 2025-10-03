import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';

@Module({
  controllers: [InventarioController],
  providers: [InventarioService],
})
export class InventarioModule {}