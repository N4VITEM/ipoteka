import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createObjectDTO } from 'src/DTO/Object.dto';
import { Project } from 'src/Models/Object.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project)
    private readonly project: typeof Project,
  ) {}

  async getAll(): Promise<Project[]> {
    return Project.findAll();
  }
  async add(createObjectDTO: createObjectDTO): Promise<Project> {
    console.log(createObjectDTO);
    return Project.create({
      object: createObjectDTO.object,
      queue: createObjectDTO.queue,
    });
  }
}
