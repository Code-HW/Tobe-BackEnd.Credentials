import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientsModule } from '../client/clients.module'
import { CredentialsController } from './credentials.controller'
import { CredentialsService } from './credentials.service'
import { CredentialsClients } from '@/entity/entities/CredentialsClients'
import { Clients } from '@/entity/entities/Clients'

@Module({
  imports: [
    TypeOrmModule.forFeature([CredentialsClients, Clients]),
    ClientsModule
  ],
  providers: [CredentialsService],
  controllers: [CredentialsController]
})
export class CredentialsModule {}
