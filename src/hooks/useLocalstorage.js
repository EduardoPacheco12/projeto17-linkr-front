import { useState, useEffect } from "react";

export function useLocalstorage({ key = 'linkrToken', value}) {
  const [localData, ] = useState(() => getLocalData());
  
  function getLocalData() {
    const localValue = JSON.parse(localStorage.getItem(key));
    if(localValue) {
      return localValue; 
    }
    return value;
  }
  
    useEffect(() => {
      if(value !== '') {
        localStorage.setItem(key, JSON.stringify(value));
        setLocalData(value);
      }
    }, [value])
    return localData
}