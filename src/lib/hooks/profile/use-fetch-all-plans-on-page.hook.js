import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


// 미리 지정해둔 url과 접속해있는 url을 비교해 true/false를 반환하는 함수
export function useFetchAllPlansOnPage(targetPath) {
  const location = useLocation();
  const [shouldFetchAll, setShouldFetchAll] = useState(false);

  useEffect(() => {
    if (location.pathname === targetPath) {
      setShouldFetchAll(true);
    } else {
      setShouldFetchAll(false);
    }
  }, [location.pathname, targetPath]);

  return shouldFetchAll;
}
