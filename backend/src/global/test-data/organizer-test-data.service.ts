import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../global/prisma/prisma.service';
import { CustomLogger } from '../../shared/custom-logger';
import { Organizer, Type } from '@prisma/client';

export const testOrganizerDepartment: Organizer = {
  id: '6ee07e9c-daa6-4d13-a96a-91a64d380a2e',
  name: 'Christopher Lao',
  type: Type.DEPARTMENT,
};
export const testOrganizerOrganization: Organizer = {
  id: '906e7fb5-67ac-4632-9c4b-6721833f1264',
  name: 'Keanue Dax Teaño',
  type: Type.ORGANIZATION,
};
@Injectable()
export class OrganizerTestDataService {
  private readonly logger = new CustomLogger(OrganizerTestDataService.name);
  constructor(private readonly prisma: PrismaService) {}

  public async generateTestData() {
    this.logger.log('GENERATING ORGANIZER TEST DATA');
    const findDepartmentOrganizer = await this.prisma.organizer.findUnique({
      where: {
        id: testOrganizerDepartment.id,
      },
    });
    const findOrganizationOrganizer = await this.prisma.organizer.findUnique({
      where: {
        id: testOrganizerOrganization.id,
      },
    });

    if (!findDepartmentOrganizer) {
      this.logger.log('GENERATING ORGANIZER TEST DATA DEPARTMENT');
      await this.createOrganizer(testOrganizerDepartment);
    }
    if (!findOrganizationOrganizer) {
      this.logger.log('GENERATING ORGANIZER TEST DATA ORGANIZATION');
      await this.createOrganizer(testOrganizerOrganization);
    }
  }

  private async createOrganizer(data: Organizer) {
    await this.prisma.organizer.create({ data });
  }
}
