import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically remove properties that are not part of the DTO
      forbidNonWhitelisted: true, // Throw an error if a non-whitelisted property is provided
      transform: true, // Automatically transform payloads to be objects typed according to their DTOs
    }),
  );
  await app.listen(5000);
}
bootstrap();
