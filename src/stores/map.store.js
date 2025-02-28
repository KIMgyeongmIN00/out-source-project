import { create } from 'zustand';

export const INITIALVALUELOCATION = {
  lat: 37.498004414546934,
  lng: 127.02770621963765
};

export const useMapStore = create((set) => ({
  center: INITIALVALUELOCATION,

  setTargetLocation: (lat, lng) =>
    set(() => ({
      center: { lat, lng }
    }))
}));
