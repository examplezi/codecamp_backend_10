import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  material: string;

  @Field(() => Int)
  delivery_fee: number;
}
