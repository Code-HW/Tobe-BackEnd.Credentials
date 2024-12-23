import { Injectable } from '@nestjs/common'
import { ClientsRepository } from './clients.repository'
import { Clients } from '@/entity/entities/Clients'
import { UUID } from 'crypto'

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async getAllClients(): Promise<Clients[]> {
    return this.clientsRepository.findAll()
  }

  async getClientById(domain: string): Promise<Clients> {
    return this.clientsRepository.findOne(domain)
  }

  async createClient(clientData: Partial<Clients>): Promise<Clients> {
    return this.clientsRepository.create(clientData)
  }

  // async updateClient(id: UUID, clientData: Partial<Clients>): Promise<Clients> {
  //   return this.clientsRepository.update(id, clientData)
  // }

  async deleteClient(id: string): Promise<void> {
    return this.clientsRepository.delete(id)
  }
}
