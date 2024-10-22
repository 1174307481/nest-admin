import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client } from 'minio'
import { IMinioConfig } from '~/config/minio.config'

@Injectable()
export class MinioService {
  private readonly minioClient: Client

  constructor(private configService: ConfigService) {
    const minioConfig = this.configService.get<IMinioConfig>('minio')
    this.minioClient = new Client({
      endPoint: minioConfig.endPoint,
      port: minioConfig.port,
      useSSL: minioConfig.useSSL,
      accessKey: minioConfig.accessKey,
      secretKey: minioConfig.secretKey,
    })
  }

  async uploadImage(bucketName: string, objectName: string, filePath: string) {
    const minioConfig = this.configService.get<IMinioConfig>('minio')

    try {
      const etag = await this.minioClient.fPutObject(bucketName, objectName, filePath)
      console.log('etag', etag, bucketName, objectName, filePath)

      const protocol = minioConfig.useSSL ? 'https' : 'http'
      const fileUrl = `${protocol}://${minioConfig.endPoint}:${minioConfig.port}/${bucketName}/${objectName}`
      return { etag, fileUrl }
    }
    catch (err) {
      console.error('Error uploading image to MinIO:', err)
      throw err
    }
  }
}
