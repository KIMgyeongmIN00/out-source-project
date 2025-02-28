import { create } from 'zustand';

export const mapStore = create((set) => ({
  //강남역 위치
  center: {
    lat: 37.498004414546934,
    lng: 127.02770621963765
  },

  setCenter: (lat, lng) =>
    set(() => ({
      center: { lat, lng }
    }))
}));
