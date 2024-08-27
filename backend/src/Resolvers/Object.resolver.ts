import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { createObjectDTO } from 'src/DTO/Object.dto';
import { Project } from 'src/Models/Object.model';
import { ProjectService } from 'src/Services/Object.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project])
  async getAllObjects(): Promise<Project[]> {
    return this.projectService.getAll();
  }

  @Mutation(() => Project)
  async createObject(
    @Args('createObjectDTO') createObjectDTO: createObjectDTO,
  ): Promise<Project> {
    return this.projectService.add(createObjectDTO);
  }
}
