/* tslint:disable */
/* eslint-disable */
/**
 * Teknoy EMS API
 * API for Teknoy EMS
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { ScheduleDTO } from './schedule-dto';

/**
 *
 * @export
 * @interface EquipmentDTO
 */
export interface EquipmentDTO {
  /**
   *
   * @type {string}
   * @memberof EquipmentDTO
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof EquipmentDTO
   */
  createdAt?: string;
  /**
   *
   * @type {string}
   * @memberof EquipmentDTO
   */
  updatedAt?: string;
  /**
   *
   * @type {string}
   * @memberof EquipmentDTO
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof EquipmentDTO
   */
  type: string;
  /**
   *
   * @type {string}
   * @memberof EquipmentDTO
   */
  brand?: string;
  /**
   *
   * @type {string}
   * @memberof EquipmentDTO
   */
  serial?: string;
  /**
   *
   * @type {Array<ScheduleDTO>}
   * @memberof EquipmentDTO
   */
  schedules?: Array<ScheduleDTO>;
  /**
   *
   * @type {string}
   * @memberof EquipmentDTO
   */
  notes: string;
}
