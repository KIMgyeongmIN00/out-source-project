import { create } from 'zustand';

const INITIAL_VALUE_LOCATION = {
  lat: 37.498004414546934,
  lng: 127.02770621963765
};

export const useMapStore = create((set) => ({
  center: INITIAL_VALUE_LOCATION,
  isInfoWindow: false,

  setTargetLocation: (lat, lng) => set({ center: { lat, lng } }),

  CloseInfoWindow: (value) => set((state) => ({ isInfoWindow: value !== undefined ? value : !state.isInfoWindow }))
}));
