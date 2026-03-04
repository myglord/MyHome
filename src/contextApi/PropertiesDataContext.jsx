import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/api';
import { apiPropertyToFrontend } from '../api/transformers';
import { properties as staticProperties } from '../data/HomeOneData/HomeOneData';

const PropertiesDataContext = createContext();

export function PropertiesDataProvider({ children }) {
  const [properties, setProperties] = useState(staticProperties);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('static');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .getProperties()
      .then((data) => {
        if (cancelled || !data || !Array.isArray(data)) return;
        if (data.length > 0) {
          setProperties(data.map(apiPropertyToFrontend));
          setSource('api');
        }
      })
      .catch(() => {
        if (!cancelled) setSource('static');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <PropertiesDataContext.Provider value={{ properties, loading, source }}>
      {children}
    </PropertiesDataContext.Provider>
  );
}

export function usePropertiesData() {
  const ctx = useContext(PropertiesDataContext);
  if (!ctx) throw new Error('usePropertiesData must be used within PropertiesDataProvider');
  return ctx;
}
