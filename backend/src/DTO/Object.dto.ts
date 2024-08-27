import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createObjectDTO {
  @Field()
  object: string;
  @Field()
  queue: number;
}
