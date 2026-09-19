import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import {
  experience,
  profile,
  projects,
  skills,
} from '../src/prisma/seed-data.js';

describe('GraphQL API', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(() => app.close());

  it('отдаёт профиль с вложенными данными из seed', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{
          profile {
            name
            description
            skills { name }
            experience { company position }
            projects { name }
          }
        }`,
      })
      .expect(200);

    expect(body.errors).toBeUndefined();
    expect(body.data.profile).toMatchObject({
      name: profile.name,
      description: profile.description,
    });
    expect(body.data.profile.skills).toEqual(
      skills.map(({ name }) => ({ name })),
    );
    expect(body.data.profile.projects).toEqual(
      projects.map(({ name }) => ({ name })),
    );
    expect(
      body.data.profile.experience.map((e: { company: string }) => e.company),
    ).toEqual(
      [...experience]
        .sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        )
        .map(({ company }) => company),
    );
  });
});
