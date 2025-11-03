import { Module } from '@nestjs/common';
import { ImagenesProductosService } from './imagenes-productos.service';
import { ImagenesProductosController } from './imagenes-productos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ImagenesProductosController],
  providers: [ImagenesProductosService, PrismaModule],
  //exports: [ImagenesProductosService],
})
export class ImagenesProductosModule {}