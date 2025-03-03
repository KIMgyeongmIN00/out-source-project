import { useState, useEffect } from 'react';
import MapSearchBox from './map-search-box';
import MapSearchResults from './map-search-results.jsx';
import { memo } from 'react';

export default memo(function MapAddressSearch() {
  const [isSearchBox, setIsSearchBox] = useState(false);
  const [mapSearch, setMapSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    if (mapSearch.trim().length > 1) {
      searchPlaces(mapSearch);
    } else {
      setSearchResults([]);
    }
  }, [mapSearch]);

  const searchPlaces = (query) => {
    setIsLoading(true);

    setTimeout(() => {
      const mockResults = [
        { id: '1', name: '스타벅스 반포점', address: '서울 서초구 반포동 115-5', category: '카페' },
        { id: '2', name: '이디야 서초점', address: '서울 서초구 반포동 116-7', category: '카페' },
        { id: '3', name: '반포 맛집', address: '서울 서초구 반포동 120-3', category: '음식점' },
        { id: '4', name: '세븐일레븐 반포점', address: '서울 서초구 반포동 118-2', category: '편의점' }
      ].filter((item) => item.name.includes(query) || item.address.includes(query));

      setSearchResults(mockResults);
      setIsLoading(false);
    }, 300);
  };

  const handleSelectResult = (result) => {
    setSelectedResult(result);
    setMapSearch(result.name);
  };

  const clearSearch = () => {
    setMapSearch('');
    setSearchResults([]);
    setSelectedResult(null);
  };

  return (
    <div className="absolute z-10 top-10 ml-6 w-[350px]">
      <div className="relative flex flex-col">
        <MapSearchBox
          isSearchBox={isSearchBox}
          setIsSearchBox={setIsSearchBox}
          mapSearch={mapSearch}
          setMapSearch={setMapSearch}
          clearSearch={clearSearch}
        />

        <MapSearchResults
          searchResults={searchResults}
          handleSelectResult={handleSelectResult}
          selectedResult={selectedResult}
          isLoading={isLoading}
          isSearchBox={isSearchBox}
          mapSearch={mapSearch}
        />
      </div>
    </div>
  );
});
