import { writable } from 'svelte/store';

interface PhotoSlot {
  id: string;
  src: string;
  text: string;
}

interface PhotoBookStore {
  slots: (PhotoSlot | null)[];
}

function createPhotoBook() {
  const { subscribe, set, update } = writable<PhotoBookStore>({
    slots: Array(4).fill(null)
  });

  return {
    subscribe,
    setSlot: (index: number, photo: PhotoSlot) =>
      update(state => {
        const newSlots = [...state.slots];
        newSlots[index] = photo;
        return { ...state, slots: newSlots };
      }),
    reset: () => set({ slots: Array(4).fill(null) })
  };
}

export const photoBook = createPhotoBook();
