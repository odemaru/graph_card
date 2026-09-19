import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Experience } from './models/experience.model.js';
import { Link } from './models/link.model.js';
import { Profile } from './models/profile.model.js';
import { Project } from './models/project.model.js';
import { Skill } from './models/skill.model.js';
import { ProfileService } from './profile.service.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile)
  profile() {
    return this.profileService.get();
  }

  @ResolveField(() => [Link])
  links(@Parent() { id }: Profile) {
    return this.profileService.links(id);
  }

  @ResolveField(() => [Skill])
  skills(@Parent() { id }: Profile) {
    return this.profileService.skills(id);
  }

  @ResolveField(() => [Experience], {
    description: 'От последнего места работы к первому',
  })
  experience(@Parent() { id }: Profile) {
    return this.profileService.experience(id);
  }

  @ResolveField(() => [Project])
  projects(@Parent() { id }: Profile) {
    return this.profileService.projects(id);
  }
}
