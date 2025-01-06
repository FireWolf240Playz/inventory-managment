import api from "./api.ts";

export async function getLicenses() {
  const response = await api.get("/licenses");

  return response.data.data.licenses;
}

export async function deleteLicense(id: string): Promise<void> {
  await api.delete(`/licenses/${id}`);
}
