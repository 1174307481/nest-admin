import * as fs from 'node:fs'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { isNil } from 'lodash'

import { Repository } from 'typeorm'

import { Storage } from '~/modules/tools/storage/storage.entity'

import { UserEntity } from '~/modules/user/user.entity' // 导入MinioService
import { MinioService } from '~/shared/minio/minio.service'
import { generateShortUUID } from '~/utils'
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
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly minioService: MinioService, // 注入MinioService
  ) {}

  /**
   * 检查文件格式并保存文件
   */
  async uploadImage(file: File, userId: number): Promise<Storage> {
    if (isNil(file))
      throw new NotFoundException('Have not any file to upload!')

    const allowedFormats = ['jpg', 'jpeg', 'png', 'gif']
    const extName = getExtname(file.name).toLowerCase()

    if (!allowedFormats.includes(extName)) {
      throw new BadRequestException(
        `Unsupported file format: ${extName}. Allowed formats: ${allowedFormats.join(
          ', ',
        )}`,
      )
    }

    return this.saveFile(file, userId)
  }

  /**
   * 保存文件上传记录
   */
  async saveFile(file: File, userId: number): Promise<Storage> {
    console.log(file.name)

    const fileName = file.name
    const size = getSize(file.size)
    const extName = getExtname(fileName)
    const type = getFileType(extName)
    const name = fileRename(fileName)
    const currentDate = dayjs().format('YYYY-MM-DD')
    const filePath = getFilePath(name, currentDate, type)

    const buffer = Buffer.from(await file.arrayBuffer())
    const tempFilePath = await saveLocalFile(buffer, name, currentDate, type)

    // 生成UUID并拼接文件扩展名作为objectName
    const objectName = `${generateShortUUID()}.${extName}`

    // 将文件上传到MinIO
    const { fileUrl } = await this.minioService.uploadImage(
      'wallpaper',
      objectName,
      tempFilePath,
    )

    // 删除临时文件
    await fs.promises.unlink(tempFilePath)
    const user = await this.userRepository.findOne({ where: { id: userId } })

    // 保存文件记录到数据库
    const storage = await this.storageRepository.save({
      name,
      fileName,
      extName,
      path: fileUrl,
      type,
      size,
      user,
      objectName,
    })

    return storage
  }
}
