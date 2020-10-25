import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config'

interface DbConfig {
  type: 'postgres'
  host: string
  port: number
  username: string
  password: string
  database: string
  synchronize: boolean
}

const dbConfig = config.get<DbConfig>('db')

const port = process.env.RDS_PORT
  ? parseInt(process.env.RDS_PORT)
  : dbConfig.port

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: !!process.env.TYPEORM_SYNC || dbConfig.synchronize,
}
