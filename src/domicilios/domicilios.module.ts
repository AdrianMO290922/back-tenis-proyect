import { Module } from '@nestjs/common';
import { DomiciliosService } from './domicilios.service';
import { DomiciliosController } from './domicilios.controller';

@Module({
  controllers: [DomiciliosController],
  providers: [DomiciliosService],
})
export class DomiciliosModule {}
