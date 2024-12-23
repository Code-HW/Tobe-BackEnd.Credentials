import { Clients } from '@/entity/entities/Clients'
import { CredentialsClients } from '@/entity/entities/CredentialsClients'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

const databaseClient = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('CLIENT_DB_HOST'),
  port: configService.get<number>('CLIENT_DB_PORT'),
  username: configService.get<string>('CLIENT_DB_USER'),
  password: configService.get<string>('CLIENT_DB_PASSWORD'),
  database: configService.get<string>('CLIENT_DB_NAME'),
  entities: [Clients, CredentialsClients],
  ssl: {
    rejectUnauthorized: false
  },
  synchronize: false // Remover em PROD
})

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      databaseClient(configService)
  })
]
