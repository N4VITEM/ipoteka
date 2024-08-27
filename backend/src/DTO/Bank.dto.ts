import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBankDTO {
  @Field()
  name: string;
  @Field()
  primaryColor: string;
  @Field()
  secondaryColor: string;
}
