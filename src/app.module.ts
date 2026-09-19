import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller.js';
import { ProfileModule } from './profile/profile.module.js';

const exampleQuery = `query {
  profile {
    name
    title
    description
    email
    links { label url }
    skills { name category }
    experience { company position startDate endDate achievements }
    projects { name url description }
  }
}`;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      graphiql: false,
      introspection: true,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ document: exampleQuery }),
      ],
    }),
    ProfileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
