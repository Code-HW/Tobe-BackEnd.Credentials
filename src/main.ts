import { setupSwagger } from '@/common/swagger'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './shared/errors/htpp-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [
      /^http:\/\/localhost:\d+$/,
      'https://tobe-frontend-vite.pages.dev',
      'https://plataforma.educacionaltobe.com.br',
      'https://plataforma.educacionalsalubrita.com.br'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: true
  })

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())

  setupSwagger(app)

  app.setGlobalPrefix('api')

  const port = process.env.PORT || 8080
  await app.listen(port).then(() => {
    console.log(`Server is Running on port ${port}`)
    const field = 'heapUsed'

    const TIME_INTERVAL_IN_MSEC = 1000 * 15

    setInterval(() => {
      const mu = process.memoryUsage()
      // # bytes / KB / MB / GB
      const gbNow = mu[field] / 1024 / 1024 / 1024
      const gbRounded = Math.round(gbNow * 100) / 100

      console.log(`Heap allocated ${gbRounded} GB`)
    }, TIME_INTERVAL_IN_MSEC)
  })

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
