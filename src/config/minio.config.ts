import { ConfigType, registerAs } from '@nestjs/config'
import { env } from '~/global/env'

export const minioRegToken = 'minio'

export const MinioConfig = registerAs(minioRegToken, () => ({
  endPoint: env('MINIO_ENDPOINT'),
  port: Number.parseInt(env('MINIO_PORT'), 10),
  useSSL: env('MINIO_USE_SSL') === 'true',
  accessKey: env('MINIO_ACCESS_KEY'),
  secretKey: env('MINIO_SECRET_KEY'),
}))

export type IMinioConfig = ConfigType<typeof MinioConfig>
