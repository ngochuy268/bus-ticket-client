import axios from 'axios';

export const fetchBusRoutes = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/bus-route`);
    return response.data;
  } catch (error) {
    console.error('バス路線の取得中にエラーが発生しました:', error);
    throw error;
  }
};

export const fetchRoutes = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/route`);
    return response.data;
  } catch (error) {
    console.error('バス路線の取得中にエラーが発生しました:', error);
    throw error;
  }
};
