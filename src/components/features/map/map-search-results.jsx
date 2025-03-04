import MapSearchResultItem from './map-search-result-item';

export default function MapSearchResults({
  isSearchBox,
  mapSearch,
  searchResults,
  isPending,
  selectedResult,
  onSelectResult
}) {
  return (
    <>
      {isSearchBox && searchResults.length > 0 && (
        <div className="mt-2 bg-white rounded-lg shadow-lg overflow-hidden max-h-[60vh] overflow-y-auto">
          <div className="p-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">검색 결과 {searchResults.length}개</p>
          </div>
          <ul>
            {searchResults.map((result) => (
              <MapSearchResultItem
                result={result}
                key={result.id}
                selectedResult={selectedResult}
                onSelectResult={onSelectResult}
              />
            ))}
          </ul>
        </div>
      )}

      {isPending && isSearchBox && mapSearch && (
        <div className="mt-2 bg-white rounded-lg shadow-lg p-4 text-center">
          <p className="text-gray-500">검색 중...</p>
        </div>
      )}

      {!isPending && isSearchBox && mapSearch && searchResults.length === 0 && (
        <div className="mt-2 bg-white rounded-lg shadow-lg p-4 text-center">
          <p className="text-gray-500">검색 결과가 없습니다</p>
        </div>
      )}
    </>
  );
}
