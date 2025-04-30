'use client';

import { LSFieldKey } from '@/interfaces/clientStorageData';
import { ClientStorage as cs } from '@/lib/clientStorage/clientStorage';
import { logger } from '@/lib/logger/logger';
import { useState, useEffect } from 'react';

/**
 * 
 * Manage user preferences stored in client-side storage.  
 * If returned value be null, means there's no such key in storage.
 * 
 * @param initialValue If occured error during reading from storage, return this value.
 * Also, if there's no such key in storage, set the key with this value and then return it.
 */
function useCUPStorage<T>(key: LSFieldKey, initialValue: T): [T, (value: T | ((prevValue: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = cs.getUPItem(key);
      return item ? (item as T) : initialValue;
    } catch (error) {
      logger.error('Error reading from localStorage: ', (error as Error).message);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      cs.setUPItem(key, storedValue);
    } catch (error) {
      logger.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  const updateStoredValue = (value: T | ((prevValue: T) => T)) => {
    const newValue = value instanceof Function ? value(storedValue) : value;
    setStoredValue(newValue);
  };

  return [storedValue, updateStoredValue];
}

export default useCUPStorage;