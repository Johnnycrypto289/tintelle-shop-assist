import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistStore {
  ids: string[];
  has: (handle: string) => boolean;
  toggle: (handle: string) => void;
  remove: (handle: string) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      has: (handle) => get().ids.includes(handle),
      toggle: (handle) =>
        set((state) => ({
          ids: state.ids.includes(handle)
            ? state.ids.filter((id) => id !== handle)
            : [...state.ids, handle],
        })),
      remove: (handle) => set((state) => ({ ids: state.ids.filter((id) => id !== handle) })),
      clear: () => set({ ids: [] }),
    }),
    {
      name: "tintelle-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
