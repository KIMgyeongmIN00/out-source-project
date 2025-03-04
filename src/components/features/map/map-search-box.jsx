import { Search, X } from 'lucide-react';

export default function MapSearchBox({ isSearchBox, setIsSearchBox, mapSearch, setMapSearch, onClearSearch }) {
  return (
    <div
      className={`flex items-center rounded-full overflow-hidden bg-white transition-all duration-300 ease-in-out shadow-lg ${
        isSearchBox ? 'w-full' : 'w-11'
      }`}
    >
      {/** 돋보기 누르면 검색창 토글 기능 */}
      <button
        onClick={() => setIsSearchBox((prev) => !prev)}
        className="flex items-center justify-center h-11 w-11 flex-shrink-0"
      >
        <Search className="h-5.5 w-5.5 text-gray-600" />
      </button>

      <input
        type="text"
        placeholder="검색어 입력..."
        className={`h-full w-full outline-none px-2 text-lg transition-opacity duration-300 
              ${isSearchBox ? 'opacity-100' : 'opacity-0'}`}
        value={mapSearch}
        onChange={(e) => setMapSearch(e.target.value)}
        disabled={!isSearchBox}
      />

      {/** 검색어 있으면 X 표시 */}
      {mapSearch && isSearchBox && (
        <button onClick={onClearSearch} className="flex items-center justify-center h-11 w-11 flex-shrink-0">
          <X className="h-5 w-5 text-gray-600" />
        </button>
      )}
    </div>
  );
}
