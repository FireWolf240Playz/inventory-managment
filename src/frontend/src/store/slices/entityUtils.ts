import { Device } from "./devices/deviceSlice.ts";
import { Employee } from "./employees/employeeSlice.ts";
import { License } from "./licenses/licensesSlice.ts";

type Entity = Device | Employee | License;

export function duplicateEntity(entity: Entity): Entity {
  if ("model" in entity) {
    return {
      ...entity,
      deviceId: generateUniqueId(),
      model: `Copy of ${entity.model}`,
    };
  }

  if ("employeeName" in entity) {
    return {
      ...entity,
      employeeId: generateUniqueId(),
      employeeName: `Copy of ${entity.employeeName}`,
    };
  }

  if ("licenseName" in entity) {
    return {
      ...entity,
      licenseId: generateUniqueId(),
      licenseName: `Copy of ${entity.licenseName}`,
    };
  }

  throw new Error("Unsupported entity type");
}

export function generateUniqueId(): string {
  return Math.random().toString(36).slice(2, 9);
}
