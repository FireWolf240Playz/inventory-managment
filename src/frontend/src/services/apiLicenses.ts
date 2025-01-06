import { License } from "../store/slices/licenses/licensesSlice.ts";
import api from "./api.ts";

export async function getLicenses() {
  const response = await api.get("/licenses");

  return response.data.data.licenses;
}

export async function getLicense(id: string): Promise<License> {
  const response = await api.get(`/licenses/${id}`);
  return response.data.data.license;
}

export async function createLicense(license: License): Promise<void> {
  await api.post("/licenses", license);
}

export async function editLicense(license: License): Promise<void> {
  await api.put(`/licenses/${license.licenseId}`, license);
}

export async function deleteLicense(id: string): Promise<void> {
  await api.delete(`/licenses/${id}`);
}
