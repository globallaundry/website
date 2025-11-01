import { create } from 'zustand';

type Session = {
  customerID: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  storeID?: number;
  storeLabel?: string;
};

type Store = {
  session: Session | null;
  setSession: (data: Session) => void;
  clearSession: () => void;
};

export const useSessionStore = create<Store>((set) => ({
  session: null,
  setSession: (data) => set({ session: data }),
  clearSession: () => set({ session: null }),
}));