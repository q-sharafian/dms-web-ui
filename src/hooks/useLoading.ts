import { useState } from "react";

export const useLoading = () => {
  const [loading, setLoadingState] = useState(0);

  /**
   * 
   * @param val Value to increase/decrease the loading value
   * @returns 
   */
  const setLoading = (val: number) => setLoadingState(loading + val);

  return { loading, setLoading };
};