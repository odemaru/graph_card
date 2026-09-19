import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => ID)
  id: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  startDate: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'Пусто, если работа продолжается',
  })
  endDate: Date | null;

  @Field(() => [String])
  achievements: string[];
}
