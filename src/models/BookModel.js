import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createBooking = async (reservationData) => {
    try {
        const response = await axios.post(`${API_URL}/api/booking`, reservationData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchRoutesByDepartAndDest = async (depart, dest) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/bus-route/search`, 
        {
          params: { depart, dest }  
        }
      );
      return response;
    } catch (error) {
      console.error('バス路線の取得中にエラーが発生しました:', error);
      throw error;
    }
  };