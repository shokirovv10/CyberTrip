import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:3000,https://cybertrip.uz';
  const allowedOrigins = rawOrigins.split(',').map((o) => o.trim());

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile, server-side fetch) or matching origins
      if (
        !origin || 
        allowedOrigins.includes(origin) || 
        allowedOrigins.includes('*') ||
        origin.includes('localhost') || 
        origin.includes('cybertrip') ||
        origin.includes('onrender.com')
      ) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  });

  app.use(cookieParser());
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
    }),
  );
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  const port = process.env.PORT || 4000;
  // Bind to 0.0.0.0 so Docker, Render, and cloud proxies can reach the service
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 CYBERTRIP API running on http://0.0.0.0:${port}/api`);
}
bootstrap();
