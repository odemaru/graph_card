import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  get() {
    return this.prisma.profile.findFirstOrThrow();
  }

  links(profileId: number) {
    return this.prisma.link.findMany({
      where: { profileId },
      orderBy: { id: 'asc' },
    });
  }

  skills(profileId: number) {
    return this.prisma.skill.findMany({
      where: { profileId },
      orderBy: { id: 'asc' },
    });
  }

  experience(profileId: number) {
    return this.prisma.experience.findMany({
      where: { profileId },
      orderBy: { startDate: 'desc' },
    });
  }

  projects(profileId: number) {
    return this.prisma.project.findMany({
      where: { profileId },
      orderBy: { id: 'asc' },
    });
  }
}
