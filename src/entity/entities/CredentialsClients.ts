import { Column, Entity, Index, OneToOne } from 'typeorm'
import { Clients } from './Clients'
import { UUID } from 'crypto'

@Index('credentials_clients_pkey', ['id'], { unique: true })
@Entity('credentials_clients', { schema: 'public' })
export class CredentialsClients {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  id: UUID

  @Column('character varying', { name: 'name', length: 255 })
  name: string

  @Column('character varying', { name: 'host', length: 255 })
  host: string

  @Column('integer', { name: 'port' })
  port: number

  @Column('character varying', { name: 'username', length: 255 })
  username: string

  @Column('character varying', { name: 'password', length: 255 })
  password: string

  @Column('uuid', { name: 'organization', nullable: true })
  organization: string | null

  @OneToOne(() => Clients, (clients) => clients.credentialsClients)
  clients: Clients
}
