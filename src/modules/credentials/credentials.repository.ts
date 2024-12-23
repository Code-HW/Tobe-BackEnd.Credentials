import { Clients } from '@/entity/entities/Clients'
import { CredentialsClients } from '@/entity/entities/CredentialsClients'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UUID } from 'crypto'
import { Repository } from 'typeorm'

interface params {
  id?: UUID
  domain?: string
}

@Injectable()
export class CredentialsClientRepository {
  constructor(
    @InjectRepository(CredentialsClients)
    private readonly credentialsClientRepository: Repository<CredentialsClients>
  ) {}

  async findAll(): Promise<CredentialsClients[]> {
    return this.credentialsClientRepository.find()
  }

  async findOne(id: UUID): Promise<CredentialsClients> {
    const credentialsClient = await this.credentialsClientRepository.findOne({
      where: { id }
    })

    if (!credentialsClient) {
      throw new NotFoundException(`Credentials with ID ${id} not found`)
    }

    return credentialsClient
  }

  async create(clientData: Partial<Clients>): Promise<CredentialsClients> {
    const client = this.credentialsClientRepository.create(clientData)
    return this.credentialsClientRepository.save(client)
  }

  async update(
    id: UUID,
    clientData: Partial<Clients>
  ): Promise<CredentialsClients> {
    await this.credentialsClientRepository.update(id, clientData)
    return this.findOne(id)
  }

  async delete(id: string): Promise<void> {
    await this.credentialsClientRepository.delete(id)
  }
}
