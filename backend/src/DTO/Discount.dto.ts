import { Field, InputType } from '@nestjs/graphql';
import { Project } from 'src/Models/Object.model';
import { Variable } from 'src/Models/Variable.model';
import { createVariableDTO } from './Variable.dto';
import { createProjectDTO } from './Project.dto';

@InputType()
export class createDiscountDTO {
  @Field(() => [createVariableDTO])
  variables: Variable[];

  @Field(() => createProjectDTO)
  project: Project;
}
