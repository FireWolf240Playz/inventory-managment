import { deleteDevice } from "./apiDevices.ts";
import { deleteEmployee } from "./apiEmployees";
import { deleteLicense } from "./apiLicenses";
// or wherever these live

export function getDeleteFn(
  resourceName: string,
): (id: string) => Promise<void> {
  switch (resourceName) {
    case "devices":
      return deleteDevice;
    case "employees":
      return deleteEmployee;
    case "licenses":
      return deleteLicense;
    default:
      throw new Error(`Unknown resourceName: ${resourceName}`);
  }
}
