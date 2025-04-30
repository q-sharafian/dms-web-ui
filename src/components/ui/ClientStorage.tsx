/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useCUPStorage from '@/hooks/useClientStorage';
import { LSFieldKey } from '@/interfaces/clientStorageData';
import React from 'react';

interface ClientStorageProps {
  /**
   * Storage key
   */
  sKey: LSFieldKey
  value: any
}

/** 
 * This component set a key-value in client-side storage.
 */
const ClientStorage: React.FC<ClientStorageProps> = ({ sKey, value }: ClientStorageProps) => {
  const [preference, setPreference] = useCUPStorage(sKey, value);
  // TODO: Should below line be removed?
  // setPreference(value);
  return null
}

export default ClientStorage;