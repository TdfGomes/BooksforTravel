import { useRef, useCallback } from "react";

function useGetLatest(obj) {
  const ref = useRef();
  ref.current = obj;

  return useCallback(() => ref.current, []);
}

export default useGetLatest;
