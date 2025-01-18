import { useState, useEffect } from 'react';
import { fetchBusRoutes, fetchRoutes, fetchRoutesByDepartAndDest } from '../models/busRouteModel';

export const useBusRoutes = (depart, dest) => {
  const [busRoutes, setBusRoutes] = useState([]);
  const [routes, setRoutes] =useState([]);
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

  useEffect(() => {
    const getRoutes = async () => {
      try {
        const routes = await fetchRoutes();
        setRoutes(routes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getRoutes();
  }, []);


  return { routes, busRoutes, loading, setBusRoutes};
};
