import { useState, useEffect } from 'react';
import MapSearchBox from './map-search-box';
import MapSearchResults from './map-search-results.jsx';
import { memo } from 'react';
import { useKakaoSearchQuery } from '@/lib/apis/map.api';
import { useMapStore } from '@/stores/map.store';

export default memo(MapAddressSearch);

function MapAddressSearch({ currentLocation }) {
  const [isSearchBox, setIsSearchBox] = useState(false);
  const [mapSearch, setMapSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  const setTargetLocation = useMapStore((state) => state.setTargetLocation);
  const setSelectedAddress = useMapStore((state) => state.setSelectedAddress);
  const toggleInfoWindow = useMapStore((state) => state.toggleInfoWindow);

  const { data, isPending } = useKakaoSearchQuery(currentLocation, mapSearch);

  useEffect(() => {
    if (data) {
      setSearchResults(data?.documents);
    } else {
      setSearchResults([]);
    }
  }, [data]);

  // 검색 결과 선택 시 호출되는 함수
  const handleSelectResult = (result) => {
    toggleInfoWindow(true);
    setSelectedResult(result);
    setTargetLocation(result.y, result.x);
    setSelectedAddress(result.place_name, result.address_name);
  };

  // 검색어 초기화 함수
  const handleClearSearch = () => {
    setMapSearch('');
    setSearchResults([]);
    setSelectedResult(null);
  };

  return (
    <div className="absolute z-10 top-10 ml-6 w-[300px]">
      <div className="relative flex flex-col">
        <MapSearchBox
          isSearchBox={isSearchBox}
          setIsSearchBox={setIsSearchBox}
          mapSearch={mapSearch}
          setMapSearch={setMapSearch}
          onClearSearch={handleClearSearch}
        />

        <MapSearchResults
          isSearchBox={isSearchBox}
          mapSearch={mapSearch}
          searchResults={searchResults}
          isPending={isPending}
          selectedResult={selectedResult}
          onSelectResult={handleSelectResult}
        />
      </div>
    </div>
  );
}
