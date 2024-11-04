import { ConfigType, registerAs } from '@nestjs/config'
import { env } from '~/global/env'

export const minioRegToken = 'minio'

export const MinioConfig = registerAs(minioRegToken, () => ({
  endPoint: env('MINIO_ENDPOINT'),
  port: Number.parseInt(env('MINIO_PORT'), 10),
  proxyPort: Number.parseInt(env('MINIO_PROXY_PORT'), 10),
  useSSL: env('MINIO_USE_SSL') === 'true',
  accessKey: env('MINIO_ACCESS_KEY'),
  secretKey: env('MINIO_SECRET_KEY'),
  bucketName: env('MINIO_BUCKET_NAME'),
}))

export type IMinioConfig = ConfigType<typeof MinioConfig>
