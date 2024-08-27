import { Field, InputType } from '@nestjs/graphql';
import { createVariableDTO } from './Variable.dto';
import { Variable } from 'src/Models/Variable.model';
import { Discount } from 'src/Models/Discount.model';
import { createDiscountDTO } from './Discount.dto';

@InputType()
export class CreateProgramDTO {
  @Field()
  name: string;
  @Field(() => [createVariableDTO])
  variables: Variable[];
  @Field(() => [createDiscountDTO])
  discounts: Discount[];
  @Field()
  bankId: number;
}
