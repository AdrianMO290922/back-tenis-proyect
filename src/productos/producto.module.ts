import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';

@Module({
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}