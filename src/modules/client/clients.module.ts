import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientsController } from './clients.controller'
import { ClientsRepository } from './clients.repository'
import { ClientsService } from './clients.service'
import { Clients } from '@/entity/entities/Clients'
import { CredentialsClients } from '@/entity/entities/CredentialsClients'

@Module({
  imports: [TypeOrmModule.forFeature([Clients, CredentialsClients])],
  controllers: [ClientsController],
  providers: [ClientsService, ClientsRepository],
  exports: [ClientsRepository]
})
export class ClientsModule {}
