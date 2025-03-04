import { useMapAddressSearch } from '@/lib/hooks/map/use-map-search.hook';
import { memo } from 'react';
import MapSearchBox from './map-search-box';
import MapSearchResults from './map-search-results';

export default memo(MapAddressSearch);

function MapAddressSearch({ currentLocation }) {
  const {
    isSearchBox,
    setIsSearchBox,
    mapSearch,
    setMapSearch,
    searchResults,
    isPending,
    selectedResult,
    handleSelectResult,
    handleClearSearch
  } = useMapAddressSearch(currentLocation);

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
