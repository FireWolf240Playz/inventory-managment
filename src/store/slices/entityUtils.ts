import { Device } from "./devices/deviceSlice.ts";
import { Employee } from "./employees/employeeSlice.ts";

type Entity = Device | Employee;

export function duplicateEntity(entity: Entity): Entity {
  if ("model" in entity) {
    return {
      ...entity,
      deviceId: generateUniqueId(), //Todo: Will come up with something better later
      model: `Copy of ${entity.model}`,
    };
  }

  if ("employeeName" in entity) {
    return {
      ...entity,
      employeeId: generateUniqueId(), //Todo: Will come up with something better later
      employeeName: `Copy of ${entity.employeeName}`,
    };
  }

  throw new Error("Unsupported entity type");
}

export function generateUniqueId(): string {
  return Math.random().toString(36).slice(2, 9);
}
