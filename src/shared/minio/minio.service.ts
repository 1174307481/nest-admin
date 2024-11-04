import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client } from 'minio'
import { IMinioConfig } from '~/config/minio.config'

@Injectable()
export class MinioService {
  private readonly minioClient: Client

  constructor(private configService: ConfigService) {
    const minioConfig = this.configService.get<IMinioConfig>('minio')
    const isProduction = process.env.NODE_ENV === 'production'
    // const agent = new https.Agent({
    //   rejectUnauthorized: isProduction,
    // })

    this.minioClient = new Client({
      endPoint: minioConfig.endPoint,
      port: minioConfig.port,
      useSSL: minioConfig.useSSL,
      accessKey: minioConfig.accessKey,
      secretKey: minioConfig.secretKey,
      // transportAgent: agent,
    })
  }

  async uploadImage(bucketName: string, objectName: string, filePath: string) {
    const minioConfig = this.configService.get<IMinioConfig>('minio')

    try {
      const etag = await this.minioClient.fPutObject(bucketName, objectName, filePath)

      const protocol = minioConfig.useSSL ? 'https' : 'http'
      const fileUrl = `${protocol}://${minioConfig.endPoint}:${minioConfig.proxyPort}/${bucketName}/${objectName}`
      return { etag, fileUrl }
    }
    catch (err) {
      console.error('Error uploading image to MinIO:', err)
      throw err
    }
  }

  async deleteImage(bucketName: string, objectName: string) {
    try {
      await this.minioClient.removeObject(bucketName, objectName)
      console.log(`Deleted ${objectName} from ${bucketName}`)
    }
    catch (err) {
      console.error('Error deleting image from MinIO:', err)
      throw err
    }
  }

  getBucketName(): string {
    const minioConfig = this.configService.get<IMinioConfig>('minio')
    return minioConfig.bucketName
  }
}
