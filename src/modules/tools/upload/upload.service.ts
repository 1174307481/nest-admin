import * as fs from 'node:fs'
import { MultipartFile } from '@fastify/multipart'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { isNil } from 'lodash'

import { Repository } from 'typeorm'

import { Storage } from '~/modules/tools/storage/storage.entity'

import { MinioService } from '~/shared/minio/minio.service' // 导入MinioService
import { generateUUID } from '~/utils'
import {
  fileRename,
  getExtname,
  getFilePath,
  getFileType,
  getSize,
  saveLocalFile,
} from '~/utils/file.util'

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
    private readonly minioService: MinioService, // 注入MinioService
  ) {}

  /**
   * 保存文件上传记录
   */
  async saveFile(file: MultipartFile, userId: number): Promise<Storage> {
    if (isNil(file))
      throw new NotFoundException('Have not any file to upload!')

    const fileName = file.filename
    const size = getSize(file.file.bytesRead)
    const extName = getExtname(fileName)
    const type = getFileType(extName)
    const name = fileRename(fileName)
    const currentDate = dayjs().format('YYYY-MM-DD')
    const filePath = getFilePath(name, currentDate, type)

    const buffer = await file.toBuffer()
    const tempFilePath = await saveLocalFile(buffer, name, currentDate, type)

    // 生成UUID并拼接文件扩展名作为objectName
    const objectName = `${generateUUID()}.${extName}`

    // 将文件上传到MinIO
    const { fileUrl } = await this.minioService.uploadImage('wallpaper', objectName, tempFilePath)

    // 删除临时文件
    await fs.promises.unlink(tempFilePath)

    // 保存文件记录到数据库
    const storage = await this.storageRepository.save({
      name,
      fileName,
      extName,
      path: fileUrl,
      type,
      size,
      userId,
      objectName,
    })

    return storage
  }
}
