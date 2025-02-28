import { GANGNAMSTATION } from '@/constants/initial-value-location';
import { create } from 'zustand';

export const useMapStore = create((set) => ({
  initialValueLocation: GANGNAMSTATION,

  getTargetLocation: (lat, lng) =>
    set(() => ({
      initialValueLocation: { lat, lng }
    }))
}));
