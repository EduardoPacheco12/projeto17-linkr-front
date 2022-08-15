import { useState, useEffect } from "react";

export function useLocalstorage({ key = 'linkrToken', value = ''}) {
  const [localData, setLocalData] = useState(() => getLocalData());
  
  function getLocalData() {
    const localValue = JSON.parse(localStorage.getItem(key));
    if(localValue?.token) {
      return localValue;
    }
    return value;
  }

  useEffect(() => {
    if(value !== '') {
      localStorage.setItem(key, JSON.stringify(value));
      setLocalData({...value});
    }
    // eslint-disable-next-line
  }, [value])
  
  return localData
}