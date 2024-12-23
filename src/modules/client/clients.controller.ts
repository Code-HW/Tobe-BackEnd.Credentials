import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ClientsService } from './clients.service'
import { Clients } from '@/entity/entities/Clients'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async getAllClients(): Promise<Clients[]> {
    return this.clientsService.getAllClients()
  }

  @Get()
  async getClientByDomain(domain: string): Promise<Clients> {
    console.log(domain, 'controller')
    return this.clientsService.getClientById(domain)
  }

  @Post()
  async createClient(@Body() clientData: Partial<Clients>): Promise<Clients> {
    return this.clientsService.createClient(clientData)
  }

  // @Put(':id')
  // async updateClient(
  //   @Param('id') id: UUID,
  //   @Body() clientData: Partial<Clients>
  // ): Promise<Clients> {
  //   return this.clientsService.updateClient(id, clientData)
  // }

  @Delete(':id')
  async deleteClient(@Param('id') id: string): Promise<void> {
    return this.clientsService.deleteClient(id)
  }
}
