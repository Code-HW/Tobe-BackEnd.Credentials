import { databaseProviders } from '@/config/databaseClient'
import { ClientsModule } from '@/modules/client/clients.module'
import { CredentialsModule } from '@/modules/credentials/credentials.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { StatusModule } from './modules/status/status.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env']
    }),
    ...databaseProviders,
    ClientsModule,
    CredentialsModule,
    StatusModule
  ]
})
export class AppModule {}
