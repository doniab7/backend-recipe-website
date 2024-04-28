import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { HasId } from '../interface/hasId.interface';
import { extname } from 'path';
import { createReadStream, createWriteStream } from 'fs';

@Injectable()
export class CrudService<Entity extends HasId> {
  constructor(private repository: Repository<Entity>) {}

  create(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity);
  }

  async update(id: string, updateDto: DeepPartial<Entity>): Promise<Entity> {
    const entity = await this.repository.preload({
      id,
      ...updateDto,
    });
    if (!entity) {
      throw new NotFoundException('entity Not Found');
    }
    return this.repository.save(entity);
  }

  async remove(id: string): Promise<DeleteResult> {
    const result = await this.repository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('entity Not Found');
    }
    return result;
  }

  async restore(id: string): Promise<UpdateResult> {
    const result = await this.repository.restore(id);
    if (!result.affected) {
      throw new NotFoundException('entity Not Found');
    }
    return result;
  }

  findAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  findOne(id): Promise<Entity> {
    return this.repository.findOneBy({ id });
  }
  async uploadFile(
    file: Express.Multer.File,
    destination: string,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('Aucun fichier trouvé');
    }

    const fileName = `${Date.now()}${extname(file.originalname)}`;
    const uploadPath = `public/uploads/${destination}/${fileName}`;
    console.log(fileName)
    const reader = createReadStream(file.path);
    const writer = createWriteStream(uploadPath);
    reader.pipe(writer);

    return fileName;
  }
}
