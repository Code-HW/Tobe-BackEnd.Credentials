import { Controller, Post, Body } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CredentialsService } from './credentials.service'

class GetCredentialsDto {
  domain: string
}

@ApiTags('credentials')
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  @ApiOperation({ summary: 'Get application credentials' })
  async getCredentials(@Body() getCredentialsDto: GetCredentialsDto) {
    let { domain } = getCredentialsDto
    if (domain.includes('localhost')) {
      domain = 'educacionaltobe'
    }

    return await this.credentialsService.findCredentialsByDomain(domain)
  }
}
