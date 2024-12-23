import { Clients } from '@/entity/entities/Clients'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UUID } from 'crypto'
import { Repository } from 'typeorm'

interface params {
  id?: UUID
  domain?: string
}

@Injectable()
export class ClientsRepository {
  constructor(
    @InjectRepository(Clients)
    private readonly clientsRepository: Repository<Clients>
  ) {}

  async findAll(): Promise<Clients[]> {
    return this.clientsRepository.find({ relations: ['credentials'] })
  }

  async findOne(domain: string): Promise<Clients> {
    return this.clientsRepository.findOne({
      where: { domain },

      relations: ['credentialsClients']
    })
  }

  async create(clientData: Partial<Clients>): Promise<Clients> {
    const client = this.clientsRepository.create(clientData)
    return this.clientsRepository.save(client)
  }

  // async update(id: UUID, clientData: Partial<Clients>): Promise<Clients> {
  //   await this.clientsRepository.update(id, clientData)
  //   return this.findOne({ id })
  // }

  async delete(id: string): Promise<void> {
    await this.clientsRepository.delete(id)
  }
}
