import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../common/service/crud.service';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService extends CrudService<Category> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }
  // others methods than the CRUD methods
}
