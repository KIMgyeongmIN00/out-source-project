import { MapPin } from 'lucide-react';
import { memo } from 'react';

export default memo(MapSearchResultItem);

function MapSearchResultItem({ result, selectedResult, onSelectResult }) {
  return (
    <li
      onClick={() => onSelectResult(result)}
      className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
        selectedResult?.id === result.id ? 'bg-blue-50' : ''
      }`}
    >
      <div className="flex items-start">
        <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          <p className="font-medium">{result.place_name}</p>
          <p className="text-sm text-gray-500">{result.road_address_name || result.address_name}</p>
          {result.category && (
            <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
              {result.category}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
