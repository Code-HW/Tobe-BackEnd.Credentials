import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm'
import { CredentialsClients } from './CredentialsClients'
import { UUID } from 'crypto'

@Index('clients_unique', ['credentialsClientsId'], { unique: true })
@Index('clients_pk', ['id'], { unique: true })
@Entity('clients', { schema: 'public' })
export class Clients {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  id: UUID

  @Column('character varying', { name: 'name', length: 255 })
  name: string

  @Column('character varying', { name: 'admin_contact', length: 255 })
  adminContact: string

  @Column('uuid', { name: 'credentials_clients_id', unique: true })
  credentialsClientsId: UUID

  @Column('character varying', { name: 'domain', length: 255 })
  domain: string

  @Column('character varying', { name: 'organization_id', length: 255 })
  organizationId: string

  @OneToOne(
    () => CredentialsClients,
    (credentialsClients) => credentialsClients.clients
  )
  @JoinColumn([{ name: 'credentials_clients_id', referencedColumnName: 'id' }])
  credentialsClients: CredentialsClients
}
