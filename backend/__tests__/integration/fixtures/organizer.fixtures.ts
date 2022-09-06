import { HttpStatus } from '@nestjs/common';
import { OrganizerController } from '../../../src/organizer/organizer.controller';
import {
  OrganizerDTO,
  TypeEnum,
} from '../../../src/organizer/dto/organizer.dto';
import { requestWithStaff } from '../setup';

const organizerRoute = OrganizerController.ORGANIZER_API_PATH;

export const testCreateOrganizerDept: OrganizerDTO = {
  name: 'Maria Agwanta',
  type: TypeEnum.DEPARTMENT,
};

export const testCreateOrganizerDeptSameName: OrganizerDTO = {
  name: 'Christopher Lao',
  type: TypeEnum.DEPARTMENT,
};

export const testCreateOrganizerOrg: OrganizerDTO = {
  name: 'Patrek Mands',
  type: TypeEnum.ORGANIZATION,
};

export const testCreateOrganizerOrgSameName: OrganizerDTO = {
  name: 'Keanue Dax Teaño',
  type: TypeEnum.ORGANIZATION,
};

export const createOrganizerDept = async (
  dto: OrganizerDTO
): Promise<OrganizerDTO> => {
  const { body } = await requestWithStaff
    .post(organizerRoute)
    .send(dto)
    .expect(HttpStatus.CREATED);

  return body;
};

export const uncreatedOrganizerDept = async (
  dto: OrganizerDTO
): Promise<OrganizerDTO> => {
  const { body } = await requestWithStaff
    .post(organizerRoute)
    .send(dto)
    .expect(HttpStatus.BAD_REQUEST);

  return body;
};

export const createOrganizerOrg = async (
  dto: OrganizerDTO
): Promise<OrganizerDTO> => {
  const { body } = await requestWithStaff
    .post(organizerRoute)
    .send(dto)
    .expect(HttpStatus.CREATED);

  return body;
};

export const uncreatedOrganizerOrg = async (
  dto: OrganizerDTO
): Promise<OrganizerDTO> => {
  const { body } = await requestWithStaff
    .post(organizerRoute)
    .send(dto)
    .expect(HttpStatus.BAD_REQUEST);

  return body;
};
