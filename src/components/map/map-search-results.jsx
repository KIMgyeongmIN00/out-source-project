import { MapPin } from 'lucide-react';

export default function MapSearchResults({
  searchResults,
  handleSelectResult,
  selectedResult,
  isLoading,
  isSearchBox,
  mapSearch
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
              <li
                key={result.id}
                onClick={() => handleSelectResult(result)}
                className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                  selectedResult?.id === result.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-sm text-gray-500">{result.address}</p>
                    {result.category && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                        {result.category}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isLoading && isSearchBox && mapSearch && (
        <div className="mt-2 bg-white rounded-lg shadow-lg p-4 text-center">
          <p className="text-gray-500">검색 중...</p>
        </div>
      )}

      {!isLoading && isSearchBox && mapSearch && searchResults.length === 0 && (
        <div className="mt-2 bg-white rounded-lg shadow-lg p-4 text-center">
          <p className="text-gray-500">검색 결과가 없습니다</p>
        </div>
      )}
    </>
  );
}
