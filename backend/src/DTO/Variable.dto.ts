import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createVariableDTO {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  definition?: string;

  @Field(() => Boolean)
  isConstant: boolean;
}
