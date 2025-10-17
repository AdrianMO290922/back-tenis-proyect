import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted: true
  }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Tennis API')
    .setDescription('API para la gestion de una tienda de tenis')
    .setVersion('1.0')
    .addTag('BackTennis')
    .build();
const document = SwaggerModule.createDocument(app, config);
app.use('/docs', apiReference({content:document}))

  await app.listen(process.env.PORT ?? 4321);
}
bootstrap();
