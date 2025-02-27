import { create } from "zustand";

interface UserState {
  selectedUserId: number | null;
  selectedUserName: string | null;
  setSelectedUser: (id: number, name: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  selectedUserId: null,
  selectedUserName: null,
  setSelectedUser: (id, name) =>
    set({ selectedUserId: id, selectedUserName: name }),
}));
