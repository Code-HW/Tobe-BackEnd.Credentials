import { CredentialsModule } from '@/modules/credentials/credentials.module'
import { StatusModule } from '@/modules/status/status.module'
import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Tobe API')
    .setDescription('My Description')
    .setVersion('1.0.0')
    .addServer('/api/')
    .build()

  const document = SwaggerModule.createDocument(app, config, {
    include: [StatusModule, CredentialsModule]
  })

  SwaggerModule.setup('docs', app, document)
}
