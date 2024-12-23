import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ClientsRepository } from '../client/clients.repository'
import { CredentialsClients } from '@/entity/entities/CredentialsClients'
import { CredentialsClientRepository } from './credentials.repository'

@Injectable()
export class CredentialsService {
  private readonly logger = new Logger(CredentialsService.name)

  constructor(
    @InjectRepository(CredentialsClients)
    private readonly credentialClientsRepository: CredentialsClientRepository,
    private readonly clientsRepository: ClientsRepository
  ) {}

  async findCredentialsByDomain(domain: string): Promise<CredentialsClients> {
    try {
      const client = await this.clientsRepository.findOne(domain)

      if (!client) {
        this.logger.error(`Client not found for domain: ${domain}`)
        throw new Error('Client not found')
      }

      const credentials: CredentialsClients = { ...client.credentialsClients }

      console.log(credentials)

      return credentials
    } catch (error) {
      this.logger.error(
        `Error finding credentials for domain ${domain}: ${error.message}`,
        error.stack
      )
      throw error
    }
  }
}
