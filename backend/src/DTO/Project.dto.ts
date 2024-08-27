import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class createProjectDTO {
  @Field(() => String)
  object: string;

  @Field(() => String)
  region: string;

  @Field(() => Int)
  queue: number;
}
