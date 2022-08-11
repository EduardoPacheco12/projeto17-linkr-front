import { useState, useEffect } from "react";

export function useLocalstorage({ key = 'linkrToken', value}) {
  const [localData, ] = useState(() => getLocalData());
  
  function getLocalData() {
    // const localValue = JSON.parse(localStorage.getItem(key));
    const localValue = localStorage.getItem(key);
    if(localValue) {
      return localValue; 
    }
    return value;
  }
  
    useEffect(() => {
      if(value !== '') {
        localStorage.setItem(key, value);
      }
    }, [value])
    return localData
}