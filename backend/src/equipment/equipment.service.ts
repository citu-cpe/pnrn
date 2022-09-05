import { Injectable, NotFoundException } from '@nestjs/common';
import { Equipment, Schedule } from '@prisma/client';
import { ScheduleDTO } from '../schedule/dto/schedule.dto';
import { PrismaService } from '../global/prisma/prisma.service';
import { EquipmentDTO } from './dto/equipment.dto';
import { ScheduleService } from '../schedule/schedule.service';
import { NotFoundError } from '@prisma/client/runtime';

@Injectable()
export class EquipmentService {
  constructor(private readonly prisma: PrismaService) {}

  public async addEquipment(data: EquipmentDTO): Promise<EquipmentDTO> {
    const equipment = await this.prisma.equipment.create({
      data,
    });
    return EquipmentService.convertToDTO(equipment);
  }
  public async addScheduletoEquipment(
    id: string,
    data: ScheduleDTO
  ): Promise<EquipmentDTO> {
    const schedule = await this.prisma.schedule.create({
      data,
    });
    const equipment = await this.prisma.equipment.update({
      where: {
        id,
      },
      data: {
        schedules: {
          connect: {
            id: schedule.id,
          },
        },
      },
    });
    return equipment;
  }
  public async getAllEquipments(): Promise<EquipmentDTO[]> {
    try {
      const getAll = await this.prisma.equipment.findMany({
        include: {
          schedules: true,
        },
      });
      return getAll.map((equipment) =>
        EquipmentService.convertToDTO(equipment)
      );
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new NotFoundException();
      }
    }
  }
  public async getEquipmenyById(id: string): Promise<EquipmentDTO> {
    try {
      const equipment = await this.prisma.equipment.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          schedules: true,
        },
      });
      return EquipmentService.convertToDTO(equipment);
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new NotFoundException();
      }
    }
  }
  public async deleteEquipment(id: string): Promise<EquipmentDTO> {
    try {
      const equipment = await this.prisma.equipment.delete({
        where: {
          id,
        },
      });
      return EquipmentService.convertToDTO(equipment);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  public async updateEquipment(
    id: string,
    data: EquipmentDTO
  ): Promise<EquipmentDTO> {
    try {
      const equipment = await this.prisma.equipment.update({
        where: {
          id,
        },
        data,
      });
      return EquipmentService.convertToDTO(equipment);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  public static convertToDTO(
    equipment: Equipment & { schedules?: Schedule[] }
  ): EquipmentDTO {
    const equipmentDTO = new EquipmentDTO();
    equipmentDTO.brand = equipment.brand;
    equipmentDTO.id = equipment.id;
    equipmentDTO.name = equipment.name;
    equipmentDTO.notes = equipment.notes;
    equipmentDTO.type = equipment.type;
    equipmentDTO.serial = equipment.serial;

    if (equipment.schedules) {
      equipmentDTO.schedules = equipment.schedules.map((schedule) =>
        ScheduleService.convertToDTO(schedule)
      );
    }
    return equipmentDTO;
  }
}