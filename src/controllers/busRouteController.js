import { useState, useEffect } from 'react';
import { fetchBusRoutes } from '../models/busRouteModel';

export const useBusRoutes = () => {
  const [busRoutes, setBusRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBusRoutes = async () => {
      try {
        const routes = await fetchBusRoutes();
        setBusRoutes(routes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getBusRoutes();
  }, []);

  return { busRoutes, loading, setBusRoutes };
};
