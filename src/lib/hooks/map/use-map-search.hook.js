import { useState, useEffect } from 'react';
import { useKakaoSearchQuery } from '@/lib/apis/map.api';
import { useMapStore } from '@/stores/map.store';

export const useMapAddressSearch = (currentLocation) => {
  const [isSearchBox, setIsSearchBox] = useState(false);
  const [mapSearch, setMapSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  const setTargetLocation = useMapStore((state) => state.setTargetLocation);
  const setSelectedAddress = useMapStore((state) => state.setSelectedAddress);
  const toggleInfoWindow = useMapStore((state) => state.toggleInfoWindow);

  const { data, isPending } = useKakaoSearchQuery(currentLocation, mapSearch);

  useEffect(() => {
    setSearchResults(data?.documents || []);
  }, [data]);

  const handleSelectResult = (result) => {
    toggleInfoWindow(true);
    setSelectedResult(result);
    setTargetLocation(result.y, result.x);
    setSelectedAddress(result.place_name, result.address_name);
  };

  const handleClearSearch = () => {
    setMapSearch('');
    setSearchResults([]);
    setSelectedResult(null);
  };

  return {
    isSearchBox,
    setIsSearchBox,
    mapSearch,
    setMapSearch,
    searchResults,
    isPending,
    selectedResult,
    handleSelectResult,
    handleClearSearch
  };
};
