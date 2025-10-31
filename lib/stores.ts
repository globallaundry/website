export type StoreDef = { key: "SARL" | "SAL"; id: string; label: string };

export const STORES: StoreDef[] = [
  {
    key: "SARL",
    id: process.env.CLEANCLOUD_STORE_SARL || "",
    label: "Jdeideh — Global Laundry SARL",
  },
  {
    key: "SAL",
    id: process.env.CLEANCLOUD_STORE_SAL || "",
    label: "Dekwaneh — Global Laundry SAL",
  },
];

export function getStoreById(id?: string | null): StoreDef | undefined {
  if (!id) return undefined;
  return STORES.find((s) => s.id === id);
}
